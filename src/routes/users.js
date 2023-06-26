const router = require('express').Router();
const { genValidator } = require('../shared/validator');
const schemas = require('../controllers/users/schemas');
const { loginUser, getUsers, showUser, editUser } = require('../controllers/users');
const { isLoggedIn, thisYourAccount } = require('../shared/auth');

const mLoginUser = [genValidator(schemas.loginUserSchema)];
const mGetUsers = [isLoggedIn];
const mShowUser = [isLoggedIn];
const mEditUsers = [isLoggedIn, thisYourAccount, genValidator(schemas.editUserSchema)];

router.post('/users/login', mLoginUser, loginUser);
router.get('/users', mGetUsers, getUsers);
router.get('/users/:id', mShowUser, showUser);
router.patch('/users/:id', mEditUsers, editUser);

module.exports = router;