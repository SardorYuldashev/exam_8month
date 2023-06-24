const Joi = require('joi');

exports.addBrandSchema = Joi.object({
  name: Joi.string().required().min(2).max(50)
});