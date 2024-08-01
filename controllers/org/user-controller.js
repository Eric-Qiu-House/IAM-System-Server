const { userService } = require('../../services/org');

// 查询 全部
const inquireList = async  (req,res) => {
    try {
        const contList = await userService.findList();
        res.status(201).json(contList);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

const whereUser = async (req,res) => {
    try {
        const contList = await userService.whereUser(req.query);
        console.log(contList,'111111111111')
        res.status(201).json(contList);
    } catch (error) {  
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    inquireList,
    whereUser
}