const Joi = require('joi');

exports.editNoutbookSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  price: Joi.number().max(1000000000),
  description: Joi.string(),
  model_id: Joi.number().integer(),
  brand_id: Joi.number().integer()
});