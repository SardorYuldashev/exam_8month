const router = require('express').Router();
const upload = require('../shared/fileUpload');
const genValidator = require('../shared/validator');
const { isLoggedIn } = require('../shared/auth');

router.post('/noutbooks', upload.single('files'), (req, res) => {
});

module.exports = router;
