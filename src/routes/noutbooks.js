const router = require('express').Router();
const upload = require('../shared/fileUpload');
const uploadValidator = require('../shared/validator/uploadValidator');
const schemas = require('../conterollers/noutbooks/schemas');
const { isLoggedIn } = require('../shared/auth');
const { addNoutbook, getNoutbooks, showNoutbook, editNoutbook } = require('../conterollers/noutbooks');

const mAddNoutbook = [isLoggedIn, upload.single('photos'), uploadValidator(schemas.addNoutbookSchema)];
const mEditNoutbook = [isLoggedIn, upload.single('photos'), uploadValidator(schemas.editNoutbookSchema)];

router.post('/noutbooks', mAddNoutbook, addNoutbook);
router.get('/noutbooks', getNoutbooks);
router.get('/noutbooks/:id', showNoutbook);
router.patch('/noutbooks/:id', editNoutbook);

module.exports = router;
