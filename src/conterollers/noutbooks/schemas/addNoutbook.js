const Joi = require('joi');

exports.addNoutbookSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  price: Joi.number().required().max(1000000000),
  description: Joi.string(),
  model_id: Joi.number().integer().required(),
  brand_id: Joi.number().integer().required()
});