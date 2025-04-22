const express = require('express');
const router = express.Router();
const friendController = require('./friend.controller');

router.post('/request', friendController.sendFriendRequest);
router.put('/accept', friendController.acceptFriendRequest);
router.put('/reject', friendController.rejectFriendRequest);
router.delete('/remove', friendController.removeFriend);
router.get('/list/:account_id', friendController.getFriends);
router.get('/received/:account_id', friendController.getReceivedRequests);

module.exports = router;
