// 组织管理
const express = require('express');
const router = express.Router();
const { groupController } = require('../../controllers/org'); 

router.get('/inquireList',groupController.inquireList)
router.post('/addGroup',groupController.addGroupController)
router.post('/deleteGroup',groupController.deleteGroupController)
router.post('/updateGroup',groupController.updateGroupController)

module.exports = router;