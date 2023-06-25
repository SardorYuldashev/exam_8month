const router = require('express').Router();
const { isLoggedIn } = require('../shared/auth');
const { addCategory, getCategories, showCategory, editCategory, deleteCategory } = require('../controllers/categories');
const schemas = require('../controllers/categories/schemas');
const { genValidator } = require('../shared/validator');

const mPostCategory = [isLoggedIn, genValidator(schemas.addCategorySchema)];
const mEditCategory = [isLoggedIn, genValidator(schemas.editCategorySchema)];
const mDeleteCategory = [isLoggedIn];

router.post('/categories', mPostCategory, addCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', showCategory);
router.patch('/categories/:id', mEditCategory, editCategory);
router.delete('/categories/:id', mDeleteCategory, deleteCategory);

module.exports = router;