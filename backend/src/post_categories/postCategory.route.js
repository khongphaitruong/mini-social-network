const express = require('express');
const router = express.Router();
const postcategoriesController = require('./postCategory.controller');

router.get('/', postcategoriesController.getCategories);
router.get('/:id', postcategoriesController.getCategoryByID);
router.post('/', postcategoriesController.createCategory);
router.put('/:id', postcategoriesController.updateCategory);
router.delete('/:id', postcategoriesController.deleteCategory);

module.exports = router;
