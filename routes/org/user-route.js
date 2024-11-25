// 用户管理
const express = require('express');
const router = express.Router();
const { userController } = require('../../controllers/org'); 

router.get('/inquireList',userController.inquireList)
router.post('/whereUserId',userController.whereUserId)
router.post('/whereUser',userController.whereUser)
router.post('/getUsersByGroup',userController.getUsersByGroup)
router.post('/addUser',userController.addUserController)
router.post('/deleteUser',userController.deleteUserController)
router.post('/updateUser',userController.updateUserController)
router.post('/usersByUserIds',userController.usersByUserIds)

module.exports = router;