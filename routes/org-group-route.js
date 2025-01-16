// 组织管理
const express = require('express');
const router = express.Router();
const controller = require('../controllers/org-group-controller'); 

router.post('/addGroup',controller.createController)
router.post('/updateGroup',controller.updateController)
router.get('/inquireList',controller.readController)
router.post('/deleteGroup',controller.deleteController)

module.exports = router;