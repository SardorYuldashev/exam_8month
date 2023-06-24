const router = require('express').Router();
const genValidator = require('../shared/validator');
const { isLoggedIn } = require('../shared/auth');
const schemas = require('../conterollers/models/schemas');
const { addModel } = require('../conterollers/models');

const mAddModel = [isLoggedIn, genValidator(schemas.addModelSchema)];

router.post('/models', mAddModel, addModel);

module.exports = router;