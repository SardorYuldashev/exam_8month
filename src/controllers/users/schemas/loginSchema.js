const Joi = require('joi');

exports.loginUserSchema = Joi.object({
  username: Joi.string().required().min(4).max(50),
  password: Joi.string().required().min(6)
});