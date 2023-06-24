const router = require('express').Router();
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');
const brandsRoutes = require('./brands');

router.use(usersRoutes);
router.use(categoriesRoutes);
router.use(brandsRoutes);

module.exports = router;
