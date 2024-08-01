const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/login.controller'); //控制器 - 执行sql

router
    .route('/log')
        .post(loginController.acquireLogin)
        
router
    .route('/protected')
        .post(loginController.analysisToken)

module.exports = router;