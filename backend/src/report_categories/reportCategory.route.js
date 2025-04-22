const express = require('express');
const router = express.Router();
const controller = require('./reportCategory.controller');

router.get('/', controller.getAllReportCategories);
router.get('/:id', controller.getReportCategoryById);
router.post('/', controller.createReportCategory);
router.put('/:id', controller.updateReportCategory);
router.delete('/:id', controller.deleteReportCategory);

module.exports = router;
