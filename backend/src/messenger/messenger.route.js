const express = require('express');
const router = express.Router();
const messengerController = require('./messenger.controller');

router.post('/', messengerController.sendMessage);                       // Gửi tin nhắn
router.get('/:user1/:user2', messengerController.getMessages);          // Lấy tin nhắn giữa 2 người
router.delete('/:id', messengerController.deleteMessage);               // Xoá tin nhắn
router.get('/conversations/:userId', messengerController.getConversations); // Danh sách hội thoại

module.exports = router;
