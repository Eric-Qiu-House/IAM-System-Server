const { groupService } = require('../../services/org');

// 查询 全部
const inquireList = async  (req,res) => {
    try {
        const contList = await groupService.findList();
        res.status(201).json(contList);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

// 插入角色
const addGroupController = async (req,res) => {
    try {
        const data = await groupService.addGroup(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

// 删除
const deleteGroupController = async (req,res) => {
    try {
        const data = await groupService.updateDeleteTime(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

// 更新角色
const updateGroupController = async (req,res) => {
    try {
        const data = await groupService.updateGroup(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    inquireList,
    addGroupController,
    deleteGroupController,
    updateGroupController
}