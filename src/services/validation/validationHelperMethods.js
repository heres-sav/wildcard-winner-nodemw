/** ****************************************************************************************************************
 * Name                 :   validationHelperMethods
 * Description          :   It containe all the custom validation helper methods for Joi schema.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/03/2022
 ***************************************************************************************************************** */

const constantUtilService = require("../utils/constantUtilService");
const msgUtilService = require("../utils/msgUtilService");

// Name validator
const validateName = (name, helpers) => {
  if (!name.match(constantUtilService.NAME_REREX)) {
    return helpers.message(msgUtilService.NAME_INVALID_MSG);
  }
  return name;
};

// SSN validator
const validateSsn = (userSsn, helpers) => {
  if (
    !userSsn.match(constantUtilService.SSN_REREX) ||
    !userSsn.substring(2, 4).match(constantUtilService.SSN_DOB_REGEX)
  ) {
    return helpers.message(msgUtilService.SSN_INVALID_MSG);
  }
  return userSsn;
};

// Password validator
const validatePsw = (userPsw, helpers) => {
  if (!userPsw.match(constantUtilService.PASSWORD_REREX_8ULNS16)) {
    return helpers.message(msgUtilService.PASSWORD_INVALID_MSG);
  }
  return userPsw;
};

module.exports = {
  validateSsn,
  validatePsw,
  validateName,
};
