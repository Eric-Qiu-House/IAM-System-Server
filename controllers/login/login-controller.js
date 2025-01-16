const server = require('../../services/login/login');
const relationService = require('../../services/org-relation-service');
const roleService = require('../../services/org-role-service');
const service = require('../../services/sys-router-service');
const { createToken } = require('../../middlewares/jwt'); // 引入 jwt.js 文件中的 createToken 方法

// 登入
const loginController = async (req, res) => { 
    try {
        // 校验密码，并返回用户信息
        const userInfo = await server.loginUser(req.body);
        // 如果用户信息为空或包含错误信息，说明登录失败
        if (userInfo.error) {
            return res.status(402).json({ message: '登入失败，账号或密码错误' });
        }

        const userID = { id_: userInfo.id_ };

        // 用户ID查询关联的角色信息
        const relationData = await relationService.readByIdsService(userID);
        if (!relationData) { 
            return res.status(401).json({ message: '没有访问权限！' });
        }

        // 提取 userInfo 中的 dataValues 并添加 role_id_
        const userInfoWithRole = { ...userInfo, role_id_: relationData.role_id_ };

        // 通过角色对象，返回路由id
        const routerIDs = await roleService.readByIdsService(relationData.role_id_);
        if (!routerIDs || routerIDs.length === 0) {
            return res.status(401).json({ message: '没有访问权限！' });
        }

        // 获取路由数据
        const routerData = await service.readByRouteIdsService(routerIDs[0].router_tree_);
        if (!routerData || routerData.length === 0) {
            return res.status(401).json({ message: '没有访问权限！' });
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
        return res.status(500).json({ message: 'Internal server error', error: error.message });
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

const adminChangePasswordController = async (req, res) => {
    try {
        const data = await server.adminChangePassword(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    loginController,
    changePasswordController,
    adminChangePasswordController
}