// 角色管理
const express = require('express');
const router = express.Router();
const roleController   = require('../controllers/org-role-controller'); 

router.post('/addRole',roleController.createController)
router.post('/updateRole',roleController.updateController)
router.get('/inquireList',roleController.readController)
router.post('/deleteRole',roleController.deleteController)

module.exports = router;