// 用户管理
const express = require('express');
const router = express.Router();
const userController  = require('../controllers/org-user-controller'); 

router.post('/addUser',userController.createController)
router.post('/updateUser',userController.updateController)
router.get('/inquireList',userController.readService)
router.post('/usersByUserIds',userController.readByIdsController)
router.post('/getUsersByGroup',userController.readByGroupIdsController)
router.post('/whereUserId',userController.readByUserIdsController)
router.post('/deleteUser',userController.deleteUserController)
router.post('/readDimRouter',userController.readDimController)

// router.post('/whereUser',userController.whereUser)

module.exports = router;