const router = require('express').Router();
const genValidator = require('../shared/validator');
const schemas = require('../conterollers/users/schemas');
const {
  loginUser
} = require('../conterollers/users');

const mLoginUser = [genValidator(schemas.loginUserSchema)];

router.post('/users', mLoginUser, loginUser);

module.exports = router;