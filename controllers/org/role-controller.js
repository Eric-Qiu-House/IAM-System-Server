const { roleService } = require('../../services/org');

// 查询 全部
const inquireList = async  (req,res) => {
    try {
        const data = await roleService.findList();
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

// 插入角色
const addRoleController = async (req,res) => {
    try {
        const data = await roleService.addRole(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

// 删除
const deleteRoleController = async (req,res) => {
    try {
        const data = await roleService.updateDeleteTime(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

// 更新角色
const updateRoleController = async (req,res) => {
    try {
        const data = await roleService.updateRole(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    inquireList,
    addRoleController,
    deleteRoleController,
    updateRoleController
}