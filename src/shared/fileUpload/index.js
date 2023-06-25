const multer = require('multer');
const path = require('path');
const { randomUUID } = require('crypto');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public', 'images'),
  filename: (req, file, cb) => {
    const customFileName = randomUUID() + path.extname(file.originalname);

    cb(null, customFileName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

module.exports = upload;