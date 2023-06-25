const router = require('express').Router();
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');
const brandsRoutes = require('./brands');
const modelsRoutes = require('./models');
const noutbooksRoutes = require('./noutbooks');

router.use(usersRoutes);
router.use(categoriesRoutes);
router.use(brandsRoutes);
router.use(modelsRoutes);
router.use(noutbooksRoutes);

module.exports = router;
