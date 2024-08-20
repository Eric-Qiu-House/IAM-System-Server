// 角色管理
const express = require('express');
const router = express.Router();
const { roleController } = require('../../controllers/org'); 

router.get('/inquireList',roleController.inquireList)
router.post('/addRole',roleController.addRoleController)
router.post('/deleteRole',roleController.deleteRoleController)
router.post('/updateRole',roleController.updateRoleController)

module.exports = router;