const Joi = require('joi');

exports.editBrandSchema = Joi.object({
  name: Joi.string().required().min(2).max(50)
});