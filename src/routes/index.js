const router = require('express').Router();
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');
const brandsRoutes = require('./brands');
const modelsRoutes = require('./models');

router.use(usersRoutes);
router.use(categoriesRoutes);
router.use(brandsRoutes);
router.use(modelsRoutes);

module.exports = router;
