/** ****************************************************************************************************************
 * Name                 :   validate
 * Description          :   It contains the request validator, that will valicate the request body using Joi.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   14/03/2022
 ***************************************************************************************************************** */

const Joi = require("joi");
const constantUtilService = require("../utils/constantUtilService");
const { pickObj } = require("../utils/helperUtilService");
const { BadRequest } = require("../web/errorWebService");

// Request body validation using joi
const reqValidate = (schema) => (req, res, next) => {
  // Pick request data from proper key.
  const validSchema = pickObj(schema, constantUtilService.REQ_OBJ_HOLDER_ARR);
  const object = pickObj(req, Object.keys(validSchema));
  // Schema validate
  const { value, error } = Joi.compile(validSchema)
    .prefs({
      errors: { label: constantUtilService.KEY_STR },
      abortEarly: false,
    })
    .validate(object);
  // On error send bad request.
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(constantUtilService.COMMA_SPACE_STR);
    return next(new BadRequest(errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = reqValidate;
