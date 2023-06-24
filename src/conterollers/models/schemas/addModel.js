const Joi = require('joi');

exports.addModelSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  brand_id: Joi.number().integer()
});