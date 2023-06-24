const Joi = require('joi');

exports.editBrandSchema = Joi.object({
  name: Joi.string().required().min(5).max(50)
});