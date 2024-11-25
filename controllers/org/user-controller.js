const { userService } = require('../../services/org');
const { relationService } = require('../../services/org');

// 查询 全部
const inquireList = async (req, res) => {
    try {
        const contList = await userService.findList();
        res.status(201).json(contList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// id read user
const whereUserId = async (req, res) => {
    try {
        const contList = await userService.whereUserId(req.body);
        res.status(201).json(contList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 多条件查询
const whereUser = async (req, res) => {
    try {
        const contList = await userService.whereUser(req.query);
        res.status(201).json(contList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 部门id 筛选 用户
const getUsersByGroup = async (req, res) => {
    try {
        const relationData = await relationService.findUsersByGroup(req.body);
        // 处理没有数据的情况
        if (relationData.length === 0) {
            res.status(204).end(); // 返回 204 状态码并结束响应
        } else {
            const userIds = relationData.map(item => parseInt(item.id_, 10));
            const userData = await userService.fetchUsersByUserIds(userIds);
            console.log(userIds,'userIds')
            res.status(200).json(userData); // 返回 200 状态码和用户数据
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // 返回 500 状态码和错误消息
    }
}

// 用户id组 筛选 用户组：信息
const usersByUserIds = async (req, res) => {
    try {
        const data = await userService.fetchUsersByUserIds(req.body);
        res.status(201).json(data); // 返回 200 状态码和用户数据
    } catch (error) {
        res.status(500).json({ error: error.message }); // 返回 500 状态码和错误消息
    }
}

// 插入
const addUserController = async (req, res) => {
    try {
        const data = await userService.addUsre(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 删除
const deleteUserController = async (req, res) => {
    try {
        const data = await userService.updateDeleteTime(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 更新
const updateUserController = async (req, res) => {
    try {
        const data = await userService.updateUser(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    inquireList,
    whereUserId,
    whereUser,
    getUsersByGroup,
    usersByUserIds,
    addUserController,
    deleteUserController,
    updateUserController
}