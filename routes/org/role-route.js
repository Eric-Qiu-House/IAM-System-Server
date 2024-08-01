// 角色管理
const express = require('express');
const router = express.Router();
const { roleController } = require('../../controllers/org'); 

router.get('/inquireList',roleController.inquireList)

module.exports = router;