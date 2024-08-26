const { relationService } = require('../../services/org');

// 查询 全部
const inquireList = async (req, res) => {
    try {
        const data = await relationService.findList();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// id查询
const readOneId = async (req, res) => {
    try {
        const data = await relationService.whereId(req.body)
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 更新
const updateRelationController = async (req,res) => {
    try {
        const data = await relationService.updateRelation(req.body);
        res.status(201).json(data);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    inquireList,
    readOneId,
    updateRelationController
}