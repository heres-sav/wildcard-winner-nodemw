/** ****************************************************************************************************************
 * Name                 :   unauthSchema
 * Description          :   It contains the unauth request body schemas for request body validation service.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/03/2022
 ***************************************************************************************************************** */

const Joi = require("joi");
const {
  validateSsn,
  validatePsw,
  validateName,
} = require("../validationHelperMethods");
const {
  ssnErrorMsgs,
  pswErrorMsgs,
  nameErrorMsgs,
} = require("../validationMsgs");

// Login schema
const signin = {
  body: Joi.object().keys({
    userSsn: Joi.string().required().custom(validateSsn).messages(ssnErrorMsgs),
  }),
};

// Signup schema
const signup = {
  body: Joi.object().keys({
    name: Joi.string().required().custom(validateName).messages(nameErrorMsgs),
    userSsn: Joi.string().required().custom(validateSsn).messages(ssnErrorMsgs),
    password: Joi.string()
      .required()
      .custom(validatePsw)
      .messages(pswErrorMsgs),
  }),
};

module.exports = {
  signin,
  signup,
};
