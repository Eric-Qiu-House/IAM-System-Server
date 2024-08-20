// 系统设置.
const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/system/sys-router-controllers'); 

router.get('/systemRoutesTree',controllers.systemRouteController)
router.post('/updetaRoute',controllers.updateRouteController)


module.exports = router;