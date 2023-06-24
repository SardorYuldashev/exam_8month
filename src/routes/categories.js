const router = require('express').Router();
const { isLoggedIn } = require('../shared/auth');
const { addCategory, getCategories, showCategory, editCategory } = require('../conterollers/categories');
const schemas = require('../conterollers/categories/schemas');
const genValidator = require('../shared/validator');

const mPostCategory = [isLoggedIn, genValidator(schemas.addCategorySchema)];
const mEditCategory = [isLoggedIn, genValidator(schemas.editCategorySchema)];

router.post('/categories', mPostCategory, addCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', showCategory);
router.patch('/categories/:id', mEditCategory, editCategory);

module.exports = router;