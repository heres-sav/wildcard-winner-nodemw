/** ****************************************************************************************************************
 * Name                 :   auth-schema
 * Description          :   It contains the auth request body schemas for request body validation service.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   18/03/2022
 ***************************************************************************************************************** */

const Joi = require("joi");

const invDashboard = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  invDashboard,
};
