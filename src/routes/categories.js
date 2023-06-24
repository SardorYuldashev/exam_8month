const router = require('express').Router();
const { isLoggedIn } = require('../shared/auth');
const { addCategory, getCategories, showCategory } = require('../conterollers/categories');
const schemas = require('../conterollers/categories/schemas');
const genValidator = require('../shared/validator');

const mPostCategory = [isLoggedIn, genValidator(schemas.addCategorySchema)];

router.post('/categories', mPostCategory, addCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', showCategory);

module.exports = router;