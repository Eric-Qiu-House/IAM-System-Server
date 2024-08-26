const service = require('../../services/system/sys-router-service');

async function systemRouteController(req, res) {
    try {
        const data = await service.getRoutesTree();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateRouteController(req, res) {
    try {
        const data = await service.updateRoute(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 插入
const addRouterController = async (req,res) => {
    try {
        const data = await service.addRouter(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    systemRouteController,
    updateRouteController,
    addRouterController
}