const express = require('express');
const router = express.Router();
const likeController = require('../like_manage/likeManage.controller');

router.post('/toggle', likeController.toggleLike); // toggle like
router.get('/count/:post_id', likeController.getLikeCount); //lấy số lượt like

module.exports = router;
