const relationService = require('../services/org-relation-service');

// 查询 全部
const readController = async (req, res) => {
    try {
        const data = await relationService.readService();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// id查询
const readByIdController = async (req, res) => {
    try {
        const data = await relationService.readByIdsService(req.body)
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 更新
const updateController = async (req,res) => {
    try {
        const data = await relationService.updateService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    readController,
    readByIdController,
    updateController
}