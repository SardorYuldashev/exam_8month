const Joi = require('joi');

exports.addCategorySchema = Joi.object({
  name: Joi.string().required().min(5).max(50)
});
