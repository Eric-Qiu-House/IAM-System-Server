const Service = require('../services/org-group-service');

// 插入
const createController = async (req,res) => {
    try {
        const data = await Service.createService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 更新
const updateController = async (req,res) => {
    try {
        const data = await Service.updateService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 查询
const readController = async  (req,res) => {
    try {
        const contList = await Service.readService();
        res.status(201).json(contList);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 删除
const deleteController = async (req,res) => {
    try {
        const data = await Service.deleteService(req.body);
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