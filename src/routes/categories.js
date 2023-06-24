const router = require('express').Router();
const { isLoggedIn } = require('../shared/auth');
const { addCategory } = require('../conterollers/categories');

const mPostCategory = [isLoggedIn];

router.post('/categories', mPostCategory, addCategory);

module.exports = router;