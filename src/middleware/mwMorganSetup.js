/** ****************************************************************************************************************
 * Name                 :   mwMorganSetup
 * Description          :   It containe all the config for morgan.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/03/2022
 ***************************************************************************************************************** */

const morgan = require("morgan");
const { StatusCodes } = require("http-status-codes");
const constantUtilService = require("../services/utils/constantUtilService");
const logger = require("../services/utils/loggerUtilService");
const envConfig = require("../conf/envConfig");

// Morgan token init.
morgan.token(
  constantUtilService.MESSAGE_STR,
  (req, res) => res.locals.errorMessage || constantUtilService.BLANK_STR
);

// IP format
const getIpFormat = () =>
  envConfig.nodeEnv === constantUtilService.PROD_ENV
    ? constantUtilService.REMOTE_ADDR_STR
    : constantUtilService.BLANK_STR;
// Success response format.
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
// Error response format.
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

// Success handler for status code 2xx and 3xx.
const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= StatusCodes.BAD_REQUEST,
  stream: { write: (message) => logger.info(message.trim()) },
});

// Error handler for status code 4xx and 5xx.
const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < StatusCodes.BAD_REQUEST,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
