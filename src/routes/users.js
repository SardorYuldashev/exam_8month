const router = require('express').Router();
const genValidator = require('../shared/validator');
const schemas = require('../conterollers/users/schemas');
const { loginUser, getUsers, showUser } = require('../conterollers/users');
const { isLoggedIn } = require('../shared/auth')

const mLoginUser = [genValidator(schemas.loginUserSchema)];
const mGetUsers = [isLoggedIn];

router.post('/users', mLoginUser, loginUser);
router.get('/users', mGetUsers, getUsers);
router.get('/users/:id', mGetUsers, showUser);

module.exports = router;