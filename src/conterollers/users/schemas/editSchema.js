const Joi = require('joi');

exports.editUserSchema = Joi.object({
  username: Joi.string().min(4).max(50),
  password: Joi.string().min(6),
  first_name: Joi.string().min(3).max(50),
  last_name: Joi.string().min(3).max(70)
});