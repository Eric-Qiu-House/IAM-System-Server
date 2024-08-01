// 组织管理
const express = require('express');
const router = express.Router();
const { groupController } = require('../../controllers/org'); 

router.get('/inquireList',groupController.inquireList)

module.exports = router;