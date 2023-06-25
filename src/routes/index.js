const router = require('express').Router();
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');
const brandsRoutes = require('./brands');
const modelsRoutes = require('./models');
const noutbooksRoutes = require('./noutbooks');
const { NotFoundError } = require('../shared/errors');

router.use(usersRoutes);
router.use(categoriesRoutes);
router.use(brandsRoutes);
router.use(modelsRoutes);
router.use(noutbooksRoutes);

router.use((req, res, next) => {
  throw new NotFoundError(`Mavjud bo'lmagan yo'l`);
});

module.exports = router;