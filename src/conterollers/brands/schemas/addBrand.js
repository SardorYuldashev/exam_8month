const Joi = require('joi');

exports.addBrandSchema = Joi.object({
  name: Joi.string().required().min(5).max(50)
});