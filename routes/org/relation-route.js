// 关系管理
const express = require('express');
const router = express.Router();
const { relationController } = require('../../controllers/org'); 

router.get('/inquireList',relationController.inquireList)

module.exports = router;