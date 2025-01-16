// 系统设置.
const express = require('express');
const router = express.Router();

const controllers = require('../controllers/sys-router-controllers'); 

router.post('/addRouter',controllers.createController) 
router.post('/updetaRoute',controllers.updateController)
router.get('/systemRoutesTree',controllers.readController)

module.exports = router;