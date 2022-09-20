/** ****************************************************************************************************************
 * Name                 :   errorWebService
 * Description          :   It is the Error handler class.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const { StatusCodes } = require("http-status-codes");

// BASE ERROR CLASS
class BaseError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  // GET THE ERROR CODE BASED ON ERROR OBJ
  getCode() {
    // eslint-disable-next-line no-use-before-define
    if (this instanceof BadRequest) {
      return StatusCodes.BAD_REQUEST;
    }
    // eslint-disable-next-line no-use-before-define
    if (this instanceof NotFound) {
      return StatusCodes.NOT_FOUND;
    }
    // eslint-disable-next-line no-use-before-define
    if (this instanceof AccessDenied) {
      return StatusCodes.UNAUTHORIZED;
    }
    // eslint-disable-next-line no-use-before-define
    if (this instanceof BadGateway) {
      return StatusCodes.BAD_GATEWAY;
    }
    // eslint-disable-next-line no-use-before-define
    if (this instanceof TooManyRequest) {
      return StatusCodes.TOO_MANY_REQUESTS;
    }
    return StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

// STANDARD SERVER ERROR : SUB CLASSES OF BASE ERROR CLASS.
class BadRequest extends BaseError {}
class NotFound extends BaseError {}
class AccessDenied extends BaseError {}
class BadGateway extends BaseError {}
class TooManyRequest extends BaseError {}

module.exports = {
  BaseError,
  BadRequest,
  NotFound,
  AccessDenied,
  BadGateway,
  TooManyRequest,
};
