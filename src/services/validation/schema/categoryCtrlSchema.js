const Joi = require("joi");

const createCategorySchema = Joi.object()
  .keys({
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().optional()
    }),
  })

module.exports = {
  createCategorySchema
};
