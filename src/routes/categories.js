const router = require('express').Router();
const { isLoggedIn } = require('../shared/auth');
const { addCategory } = require('../conterollers/categories');
const schemas = require('../conterollers/categories/schemas');
const genValidator = require('../shared/validator');

const mPostCategory = [isLoggedIn, genValidator(schemas.addCategorySchema)];

router.post('/categories', mPostCategory, addCategory);

module.exports = router;