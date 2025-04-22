const express = require('express');
const router = express.Router();
const userProfileController = require('./userProfile.controller');

router.get('/', userProfileController.getAllProfiles);
router.get('/:account_id', userProfileController.getProfileByAccountId);
router.post('/', userProfileController.createProfile);
router.put('/:account_id', userProfileController.updateProfile);
router.delete('/:account_id', userProfileController.deleteProfile);

module.exports = router;
