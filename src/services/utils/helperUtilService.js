const { StatusCodes } = require("http-status-codes");
const constantUtilService = require("./constantUtilService");
const logger = require("./loggerUtilService");
const msgUtilService = require("./msgUtilService");

// EMPTY PARAM CHECK.
const isEmptyParam = (param) => {
  try {
    return (
      param && Object.keys(param).length === 0 && param.constructor === Object
    );
  } catch (exp) {
    return false;
  }
};

// FIELD BLANK CHECK.
const isBlankData = (data) => {
  try {
    return !(
      data !== null &&
      data !== undefined &&
      data !== constantUtilService.BLANK_STR
    );
  } catch (exp) {
    return true;
  }
};

// Get IP from API request header.
const getUserIp = (req) =>
  req &&
  (req.headers[constantUtilService.X_FORWARDED_FOR]
    ?.split(constantUtilService.COMMA_STR)
    .shift() ||
    req.socket?.remoteAddress ||
    null);

// Return an object composed of the picked object properties.
const pickObj = (object, keys) =>
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});

// Generate API response.
const genApiResponse = (
  isApiSuccess = false,
  data = null,
  rawApiCode = null,
  rawApiErrorMsg = null
) => {
  let statusCode = 500;
  if (isApiSuccess) {
    statusCode = StatusCodes.OK;
  } else {
    statusCode = rawApiCode
      ? parseInt(rawApiCode, 10)
      : StatusCodes.INTERNAL_SERVER_ERROR;
  }
  return {
    statusCode,
    status: isApiSuccess
      ? constantUtilService.SUCCESS_STR
      : constantUtilService.ERROR_STR,
    message: rawApiErrorMsg || constantUtilService.BLANK_STR,
    content: data,
  };
};

// Get error from exception object.
const getDetailsFromException = (expErr) => {
  try {
    // Get file paths array
    const filePaths = expErr?.stack?.split(constantUtilService.NEW_LINE_STR);
    // Get line number from path
    const lineNumber =
      filePaths &&
      filePaths[1].substring(
        filePaths[1].indexOf(constantUtilService.COLON_STR) + 1,
        filePaths[1].lastIndexOf(constantUtilService.COLON_STR)
      );
    // Get column name from path
    const columnName =
      filePaths &&
      filePaths[1].substring(
        filePaths[1].lastIndexOf(constantUtilService.COLON_STR) + 1
      );
    // Create error string with file path and line number and return it.
    return `${filePaths[0]} \n ${filePaths[1]} at line number ${lineNumber} in column ${columnName}`;
  } catch (exp) {
    logger.error("EXCEPTION INSIDE getDetailsFromException() METHOD.");
  }
  return msgUtilService.SOMETHING_WENT_WRONG;
};

const getTimestamp = () => Date.now().toString()

const getDatetime = () => new Date().toLocaleString()

module.exports = {
  isEmptyParam,
  isBlankData,
  getUserIp,
  pickObj,
  genApiResponse,
  getDetailsFromException,
  getTimestamp,
  getDatetime
};
