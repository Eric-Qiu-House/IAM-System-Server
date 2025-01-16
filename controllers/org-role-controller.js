const roleService = require('../services/org-role-service');

// 插入
const createController = async (req,res) => {
    try {
        const data = await roleService.createService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 更新
const updateController = async (req,res) => {
    try {
        const data = await roleService.updateService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 查询 全部
const readController = async  (req,res) => {
    try {
        const data = await roleService.readService();
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 删除
const deleteController = async (req,res) => {
    try {
        const data = await roleService.deleteService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createController,
    updateController,
    readController,
    deleteController
}