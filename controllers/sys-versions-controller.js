const versionsModel = require('../services/sys-versions-service');

// 插入角色
const createController = async (req,res) => {
    try {
        const data = await versionsModel.createService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 更新角色
const updateController = async (req,res) => {
    try {
        const data = await versionsModel.updateService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 查询 全部
const readController = async  (req,res) => {
    try {
        const contList = await versionsModel.readService();
        res.status(201).json(contList);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
const readLastController = async  (req,res) => {
    try {
        const contList = await versionsModel.readLatestService();
        res.status(201).json(contList);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
// 删除
const deleteController = async (req,res) => {
    try {
        const data = await versionsModel.deleteService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createController,
    updateController,
    readController,
    readLastController,
    deleteController
}