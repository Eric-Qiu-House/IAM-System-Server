const service = require('../services/sys-router-service');

async function readController(req, res) {
    try {
        const data = await service.readService();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateController(req, res) {
    try {
        const data = await service.updateService(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 插入
const createController = async (req,res) => {
    try {
        const data = await service.createService(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    createController,
    updateController,
    readController,
}