const router = require('express').Router();
const usersRoutes = require('./users');
const categoriesRoutes = require('./categories');

router.use(usersRoutes);
router.use(categoriesRoutes);

module.exports = router;
