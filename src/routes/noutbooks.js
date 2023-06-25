const router = require('express').Router();
const upload = require('../shared/fileUpload');
const uploadValidator = require('../shared/validator/uploadValidator');
const schemas = require('../conterollers/noutbooks/schemas');
const { isLoggedIn } = require('../shared/auth');
const { addNoutbook, getNoutbooks, showNoutbook, editNoutbook, deleteNoutbook } = require('../conterollers/noutbooks');

const mAddNoutbook = [isLoggedIn, upload.single('photos'), uploadValidator(schemas.addNoutbookSchema)];
const mEditNoutbook = [isLoggedIn, upload.single('photos'), uploadValidator(schemas.editNoutbookSchema)];
const mDeleteNoutbook = [isLoggedIn];

router.post('/noutbooks', mAddNoutbook, addNoutbook);
router.get('/noutbooks', getNoutbooks);
router.get('/noutbooks/:id', showNoutbook);
router.patch('/noutbooks/:id', mEditNoutbook, editNoutbook);
router.delete('/noutbooks/:id', mDeleteNoutbook, deleteNoutbook);

module.exports = router;
