const userService = require('../services/user.service');
const tokenFun = require('../utils/token');

// 校验密码-发送token给客户端
const acquireLogin = async  (req,res) => {
    try {
        const { account_, password_, } = req.body;
        console.log(req,'/req.query')
        const userInfo = await userService.whereUserId(account_);
        if (account_ == userInfo.account_ && password_ == userInfo.password_) {
            console.log(userInfo,'userInfo')
            tokenFun.acquireToken(userInfo,res)
            return
        }
        res.status(201).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 解析token 
const analysisToken = async (req,res) => {
    console.log(req.cookies.token,'req')
    try {
        const token = req.cookies.token
        tokenFun.verifyToken(token)
        res.status(201).json('成功');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    acquireLogin,
    analysisToken
}