const userService = require('../services/org-user-service');
const relationService = require('../services/org-relation-service');

// 插入
const createController = async (req, res) => {
    try {
        const userData = await userService.createService(req.body);
        console.log(userData, 'userData');
        if (userData) {
            const relationData = {
                id_: userData.id_,
                groupId: req.body.group_id_,
                roleId: req.body.role_id_,
                group_name_: req.body.group_name_,
            };

            const updatedRelation = await relationService.updateService(relationData);
            return res.status(201).json(updatedRelation);
        }

        res.status(400).json({ error: "Failed to create user data." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 更新
const updateController = async (req, res) => {
    try {
        const data = await userService.updateService(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 查询 全部
const readService = async (req, res) => {
    try {
        const contList = await userService.readService();
        res.status(201).json(contList);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// id read user
const readByIdsController = async (req, res) => {
    try {
        const contList = await userService.readByIdsService(req.body);
        res.status(201).json(contList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 多条件查询
// const whereUser = async (req, res) => {
//     try {
//         const contList = await userService.whereUser(req.query);
//         res.status(201).json(contList);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// 部门id 筛选 用户
const readByGroupIdsController = async (req, res) => {
    try {
        const relationData = await relationService.readByGroupIdsService(req.body);
        // 处理没有数据的情况 
        console.log(relationData, 'relationData');
        if (relationData.length === 0) {
            res.status(204).end(); // 返回 204 状态码并结束响应
        } else {
            // 不再使用 parseInt，而是直接使用 UUID 字符串
            const userIds = relationData.map(item => item.id_);
            const userData = await userService.readByUserIdsService(userIds);
            console.log(userIds, 'userIds');
            res.status(200).json(userData); // 返回 200 状态码和用户数据
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // 返回 500 状态码和错误消息
    }
}

// 用户id组 筛选 用户组：信息
const readByUserIdsController = async (req, res) => {
    try {
        const data = await userService.readByUserIdsService(req.body);
        res.status(201).json(data); // 返回 200 状态码和用户数据
    } catch (error) {
        res.status(500).json({ error: error.message }); // 返回 500 状态码和错误消息
    }
}


// 删除
const deleteUserController = async (req, res) => {
    try {
        const data = await userService.deleteService(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const readDimController = async (req, res) => {
    try {
        const data = await userService.readDimService(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createController,
    updateController,
    readService,
    readByIdsController,
    readByGroupIdsController,
    readByUserIdsController,
    deleteUserController,
    readDimController,
    // whereUserId,
    // // whereUser,
    // getUsersByGroup,
    // usersByUserIds,

}