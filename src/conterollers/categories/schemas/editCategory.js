const Joi = require('joi');

exports.editCategorySchema = Joi.object({
  name: Joi.string().required().min(5).max(50)
});