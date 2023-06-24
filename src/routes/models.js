const router = require('express').Router();
const genValidator = require('../shared/validator');
const { isLoggedIn } = require('../shared/auth');
const schemas = require('../conterollers/models/schemas');
const { addModel, getModels } = require('../conterollers/models');

const mAddModel = [isLoggedIn, genValidator(schemas.addModelSchema)];

router.post('/models', mAddModel, addModel);
router.get('/models', getModels);

module.exports = router;