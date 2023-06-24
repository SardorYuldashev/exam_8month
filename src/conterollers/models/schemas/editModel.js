const Joi = require('joi');

exports.editModelSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  brand_id: Joi.number().integer()
});