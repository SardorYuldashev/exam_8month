const router = require('express').Router();
const genValidator = require('../shared/validator');
const { isLoggedIn } = require('../shared/auth');
const schemas = require('../conterollers/models/schemas');
const { addModel, getModels, showModel, editModel } = require('../conterollers/models');

const mAddModel = [isLoggedIn, genValidator(schemas.addModelSchema)];
const mEditModel = [isLoggedIn, genValidator(schemas.editModelSchema)];

router.post('/models', mAddModel, addModel);
router.get('/models', getModels);
router.get('/models/:id', showModel);
router.patch('/models/:id', mEditModel, editModel);

module.exports = router;