const express = require('express');
const router = express.Router();
// const loginController = require('../../controllers/login.controller'); //控制器 - 执行sql
const controller = require('../../controllers/login/login-controller'); //控制器 - 执行sql


router.post('/loginUser',controller.loginController)
router.post('/changePassword',controller.changePasswordController)
router.post('/adminChangePassword',controller.adminChangePasswordController)

// router
//     .route('/log')
//         .post(loginController.acquireLogin)
        
// router
//     .route('/protected')
//         .post(loginController.analysisToken)

module.exports = router;