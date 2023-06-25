const Joi = require('joi');

exports.addNoutbookSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  brand: Joi.string().required().min(2).max(100)  
});