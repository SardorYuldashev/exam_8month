const router = require('express').Router();
const upload = require('../shared/fileUpload');
const uploadValidator = require('../shared/validator/uploadValidator');
const schemas = require('../conterollers/noutbooks/schemas');
const { isLoggedIn } = require('../shared/auth');
const { addNoutbook, getNoutbooks } = require('../conterollers/noutbooks');

const mAddNoutbook = [isLoggedIn, upload.single('photos'), uploadValidator(schemas.addNoutbookSchema)];

router.post('/noutbooks', mAddNoutbook, addNoutbook);
router.get('/noutbooks', getNoutbooks);

module.exports = router;
