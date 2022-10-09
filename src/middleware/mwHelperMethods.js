const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const {
  BaseError,
  AccessDenied,
  NotFound,
} = require("../services/web/errorWebService");
const { verifyAuthToken } = require("../services/web/auth/authTokenService");
const constantUtilService = require("../services/utils/constantUtilService");
const msgUtilService = require("../services/utils/msgUtilService");
const {
  getDetailsFromException,
  getUserIp,
} = require("../services/utils/helperUtilService");
const logger = require("../services/utils/loggerUtilService");
const envConfig = require("../conf/envConfig");

// IT HANDLES THE MIDDLEWARE ERRORS.
// eslint-disable-next-line no-unused-vars
const mwHandleErrors = (err, req, res, next) => {
  try {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = ReasonPhrases.INTERNAL_SERVER_ERROR;
    // Store the status code and message if the error instanace is BaseError
    if (err instanceof BaseError) {
      statusCode = err.getCode();
      message = err.message;
    }
    // Put the error message in loacl for morgan.
    res.locals.errorMessage = err.message;
    if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
      logger.error(getDetailsFromException(err));
    // Return response
    return res.status(statusCode).json({
      status: constantUtilService.ERROR_STR,
      statusCode,
      message,
      ...(envConfig.nodeEnv === constantUtilService.LOCAL_ENV && {
        stack: err.stack,
      }),
    });
  } catch (exp) {
    if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
      logger.error(getDetailsFromException(exp));
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

// CHECK THE AUTH OF PRIVATE ROUTES.
// eslint-disable-next-line consistent-return
const mwCheckPrivateRoute = async (req, res, next) => {
  try {
    // Verify auth token.
    const authToken = req.header(constantUtilService.AUTH_TOKEN_STR);
    const isVerified = await verifyAuthToken(authToken);
    // If invalid token then send access denied.
    if (!isVerified) throw new AccessDenied(ReasonPhrases.UNAUTHORIZED);
    next();
  } catch (exp) {
    next(exp);
  }
};

// CHECK THE APP ACCESS.
// eslint-disable-next-line consistent-return
const mwCheckAppAccess = (req, res, next) => {
  try {
    // If the api access is not valid then send access denied.
    if (
      !(req.header(constantUtilService.API_KEY_STR) === envConfig.mwAccessKey)
    )
      next(new AccessDenied(msgUtilService.ACCESS_DENIED));
    next();
  } catch (exp) {
    next(exp);
  }
};

// CHECK THE UNKNOWN API ENDPOINT REQUEST.
// eslint-disable-next-line consistent-return
const mwCheckUnknownAPIRequest = (req, res, next) => {
  try {
    next(new NotFound(ReasonPhrases.NOT_FOUND));
  } catch (exp) {
    next(exp);
  }
};

// CHECK THE ACCESS OF API DOC ENDPOINT REQUEST.
// eslint-disable-next-line consistent-return
const mwCheckApiDocAccess = (req, res, next) => {
  try {
    // Create whitelisted ip array from the environment variable.
    const whiteListedIpList =
      envConfig.whiteListed.ipForApiDocAccess &&
      envConfig.whiteListed.ipForApiDocAccess
        .replace(
          constantUtilService.REGX_ALL_SPACES,
          constantUtilService.BLANK_STR
        )
        .split(constantUtilService.COMMA_STR);
    // Get user ip
    const userIp = getUserIp(req);
    // Allow only the whitelisted ip user to access the api documents.
    if (
      (whiteListedIpList.includes(userIp) &&
        envConfig.nodeEnv === constantUtilService.DEV_ENV) ||
      envConfig.nodeEnv === constantUtilService.LOCAL_ENV
    ) {
      next();
    } else {
      next(new AccessDenied(msgUtilService.ACCESS_DENIED));
    }
  } catch (exp) {
    next(exp);
  }
};

module.exports = {
  mwCheckAppAccess,
  mwCheckPrivateRoute,
  mwCheckUnknownAPIRequest,
  mwHandleErrors,
  mwCheckApiDocAccess,
};
