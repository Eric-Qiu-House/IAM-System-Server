// 组织管理
const express = require('express');
const router = express.Router();
const controller = require('../controllers/sys-versions-controller'); 

router.post('/create',controller.createController)
router.post('/update',controller.updateController)
router.get('/read',controller.readController)
router.get('/readLast',controller.readLastController)
router.post('/delete',controller.deleteController)

module.exports = router;