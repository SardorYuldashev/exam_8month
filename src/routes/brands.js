const router = require('express').Router();
const { genValidator } = require('../shared/validator');
const { isLoggedIn } = require('../shared/auth');
const schemas = require('../controllers/brands/schemas');
const { addBrand, getBrands, showBrand, editBrand, deleteBrand } = require('../controllers/brands');

const mAddBrand = [isLoggedIn, genValidator(schemas.addBrandSchema)];
const mEditBrand = [isLoggedIn, genValidator(schemas.editBrandSchema)];
const mDeleteBrand = [isLoggedIn];

router.post('/brands', mAddBrand, addBrand);
router.get('/brands', getBrands);
router.get('/brands/:id', showBrand);
router.patch('/brands/:id', mEditBrand, editBrand);
router.delete('/brands/:id', mDeleteBrand, deleteBrand);

module.exports = router;