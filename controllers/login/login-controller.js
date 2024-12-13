const server = require('../../services/login/login');
const { relationService } = require('../../services/org');
const { roleService } = require('../../services/org');
const service = require('../../services/system/sys-router-service');
const { createToken } = require('../../middlewares/jwt'); // 引入 jwt.js 文件中的 createToken 方法

// 登入
const loginController = async (req, res) => { 
    try {
        // 校验密码，并返回用户信息
        const userInfo = await server.loginUser(req.body);
        if (!userInfo) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const userID = { id_: userInfo.id_ };

        // 用户ID查询关联的角色信息
        const relationData = await relationService.whereId(userID);
        if (!relationData) {
            return res.status(404).json({ message: 'Role information not found for this user' });
        }

        // 提取 userInfo 中的 dataValues 并添加 role_id_
        const userInfoWithRole = { ...userInfo.dataValues, role_id_: relationData.role_id_ };

        // 通过角色对象，返回路由id
        const routerIDs = await roleService.findRouterTreeByRoleIds(relationData.role_id_);
        if (!routerIDs || routerIDs.length === 0) {
            return res.status(404).json({ message: 'No router trees found for the given roles' });
        }

        // 获取路由数据
        const routerData = await service.findRouterIds(routerIDs[0].router_tree_);
        if (!routerData || routerData.length === 0) {
            return res.status(404).json({ message: 'No routers found for the given router tree IDs' });
        }

        // 生成 JWT token
        const data = {
            userInfo: userInfoWithRole,
            userRouter: routerData,
            token: createToken({ userInfo: userInfoWithRole })
        } 
        return res.status(200).json({ data });
        
    } catch (error) {
        console.error('Error in loginController:', error);
        return res.status(500).json({ error: error.message });
    }
};




// 修改密码
const changePasswordController = async (req, res) => {
    try {
        const data = await server.changePassword(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    loginController,
    changePasswordController
}