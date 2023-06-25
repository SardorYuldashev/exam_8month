const router = require('express').Router();
const upload = require('../shared/fileUpload');
const uploadValidator = require('../shared/validator/uploadValidator');
const schemas = require('../conterollers/noutbooks/schemas');
const { isLoggedIn } = require('../shared/auth');
const {
  addNoutbook,
  getNoutbooks,
  showNoutbook,
  editNoutbook,
  deleteNoutbook,
  addNoutbookToCategory,
  removeNoutbookFromCategory
} = require('../conterollers/noutbooks');

const mAddNoutbook = [isLoggedIn, upload.single('photos'), uploadValidator(schemas.addNoutbookSchema)];
const mEditNoutbook = [isLoggedIn, upload.single('photos'), uploadValidator(schemas.editNoutbookSchema)];
const mDeleteNoutbook = [isLoggedIn];
const mAddNoutbookToCategory = [isLoggedIn];
const mRemoveNoutbookFromCategory = [isLoggedIn];

router.post('/noutbooks', mAddNoutbook, addNoutbook);
router.get('/noutbooks', getNoutbooks);
router.get('/noutbooks/:id', showNoutbook);
router.patch('/noutbooks/:id', mEditNoutbook, editNoutbook);
router.delete('/noutbooks/:id', mDeleteNoutbook, deleteNoutbook);

router.post('/noutbooks/:noutbook_id/categories/:category_id', mAddNoutbookToCategory, addNoutbookToCategory);
router.delete('/noutbooks/:noutbook_id/categories/:category_id', mRemoveNoutbookFromCategory, removeNoutbookFromCategory);

module.exports = router;
