const express = require('express');
const router = express.Router();
const commentController = require('./commentManage.controller');

router.get('/:postId', commentController.getCommentsByPostId);
router.post('/', commentController.addComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
