const Joi = require('joi');
const { BadReqqustError } = require('../errors');
const removeFile = require('../removeFile');

/**
 * @param {Joi.Schema} schema 
 */
module.exports = function uploadValidator(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      if (req.file) {
        removeFile(req.file.filename);
      };


      err = new BadReqqustError(error.details[0].message);
      next(err);
    };
  };
};