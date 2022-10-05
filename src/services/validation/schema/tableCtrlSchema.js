const Joi = require("joi");

const createTableSchema = Joi.object()
.keys({
  body: Joi.object().keys({
    unique: Joi.string().required()
  }),
})

const orderOnTableSchema = Joi.object()
  .keys({
    // items: Joi.object().pattern(
    //   Joi.string(),
    //   Joi.object()
    //   .concat(
    //     Joi.object({
    //       count: Joi.number().required(),
    //       comment: Joi.string().optional()
    //     })
    //   )
    // )
    items: Joi.array().items({
      itemId: Joi.string().required(),
      name: Joi.string().required(),
      categoryName: Joi.string().required(),
      count: Joi.number().required(),
      comment: Joi.string().optional()
    })
  })

const addOrderOnTableSchema = {
  body: Joi.object().keys({
    _id: Joi.string().required(),
    order: orderOnTableSchema
  }),
};

const updateOrderOnTableSchema = {
  body: Joi.object().keys({
    _id: Joi.string().required(),
    timestamp: Joi.string().required(),
    order: orderOnTableSchema
  }),
};

module.exports = {
  createTableSchema,
  addOrderOnTableSchema,
  updateOrderOnTableSchema
};
