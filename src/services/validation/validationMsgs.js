/** ****************************************************************************************************************
 * Name                 :   validationMsgs
 * Description          :   It containe all the custom validation messages for Joi validation schema.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/03/2022
 ***************************************************************************************************************** */

const msgUtilService = require("../utils/msgUtilService");

// Name related error messages
const nameErrorMsgs = {
  "string.base": msgUtilService.NAME_INVALID_MSG,
  "string.empty": msgUtilService.NAME_REQUIRED_MSG,
  "any.required": msgUtilService.NAME_REQUIRED_MSG,
};

// SSN related error messages
const ssnErrorMsgs = {
  "string.base": msgUtilService.SSN_INVALID_MSG,
  "string.empty": msgUtilService.SSN_REQUIRED_MSG,
  "any.required": msgUtilService.SSN_REQUIRED_MSG,
};

// Password related error messages
const pswErrorMsgs = {
  "string.base": msgUtilService.PASSWORD_INVALID_MSG,
  "string.empty": msgUtilService.PASSWORD_REQUIRED_MSG,
  "any.required": msgUtilService.PASSWORD_REQUIRED_MSG,
};

module.exports = {
  ssnErrorMsgs,
  pswErrorMsgs,
  nameErrorMsgs,
};
