const router = require('express').Router();
const genValidator = require('../shared/validator');
const { isLoggedIn } = require('../shared/auth');
const schemas = require('../conterollers/brands/schemas');
const { addBrand, getBrands, showBrand } = require('../conterollers/brands');

const mAddBrand = [isLoggedIn, genValidator(schemas.addBrandSchema)];

router.post('/brands', mAddBrand, addBrand);
router.get('/brands', getBrands);
router.get('/brands/:id', showBrand);

module.exports = router;