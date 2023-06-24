const router = require('express').Router();
const genValidator = require('../shared/validator');
const schemas = require('../conterollers/users/schemas');
const { loginUser, getUsers, showUser, editUser } = require('../conterollers/users');
const { isLoggedIn, thisYourAccount } = require('../shared/auth');

const mLoginUser = [genValidator(schemas.loginUserSchema)];
const mGetUsers = [isLoggedIn];
const mShowUser = [isLoggedIn];
const mEditUsers = [isLoggedIn, thisYourAccount];

router.post('/users', mLoginUser, loginUser);
router.get('/users', mGetUsers, getUsers);
router.get('/users/:id', mShowUser, showUser);
router.patch('/users/:id', mEditUsers, editUser);

module.exports = router;