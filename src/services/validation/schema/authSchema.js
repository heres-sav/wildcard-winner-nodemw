const Joi = require("joi");

const invDashboard = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  invDashboard,
};
