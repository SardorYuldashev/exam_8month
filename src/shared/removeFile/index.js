const fs = require('fs');
const path = require('path');

const removeFile = (name) => {
  fs.unlinkSync(path.join(__dirname, '../../public', 'images', name));
};

module.exports = removeFile;