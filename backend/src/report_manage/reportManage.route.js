const express = require('express');
const router = express.Router();
const reportController = require('./reportManage.controller');

router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.createReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
