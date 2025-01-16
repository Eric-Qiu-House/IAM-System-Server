// 关系管理
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/org-relation-controller'); 

router.get('/inquireList',Controller.readController)
router.post('/readOneId',Controller.readByIdController)
router.post('/updateRelation',Controller.updateController)


module.exports = router;