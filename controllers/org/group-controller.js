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

module.exports = {
    inquireList,
}