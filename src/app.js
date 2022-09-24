const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const compression = require("compression");
const { StatusCodes } = require("http-status-codes");
const envConfig = require("./conf/envConfig");
const {
  mwCheckAppAccess,
  mwCheckPrivateRoute,
  mwCheckUnknownAPIRequest,
  mwHandleErrors,
  mwCheckApiDocAccess,
} = require("./middleware/mwHelperMethods");
const morgan = require("./middleware/mwMorganSetup");
const { unauthReqLimiter } = require("./middleware/mwReqRateLimiter");
const unAuthRoute = require("./routes/v1/unAuthRoute");
const authRoute = require("./routes/v1/authRoute");
const docRoute = require("./routes/v1/docRoute");
const constantUtilService = require("./services/utils/constantUtilService");

// VARIABLES
const app = express();
const WHITE_LISTED_DOMAIN =
  envConfig.whiteListed.domain &&
  envConfig.whiteListed.domain
    .replace(constantUtilService.REGX_ALL_SPACES, constantUtilService.BLANK_STR)
    .split(constantUtilService.COMMA_STR);
const WHITE_LISTED_REQ_METHODS =
  envConfig.whiteListed.reqMethods &&
  envConfig.whiteListed.reqMethods
    .replace(constantUtilService.REGX_ALL_SPACES, constantUtilService.BLANK_STR)
    .split(constantUtilService.COMMA);

// NODE MIDDLEWARE

/* REQUEST LOGGER */
/* Morgan init */
if (envConfig.nodeEnv !== constantUtilService.TEST_ENV) {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

/* SECURITY */
// Cors
app.use(
  cors({
    // origin: WHITE_LISTED_DOMAIN,
    // methods: WHITE_LISTED_REQ_METHODS,
    // exposedHeaders: envConfig.whiteListed.customHeaders,
    // optionsSuccessStatus: StatusCodes.OK, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
// Helmet
app.use(helmet());

/* BODY PARSERS */
// For parsing json body
app.use(express.json({ limit: envConfig.jsonBodySizeLimit }));
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* SECURITY */
// XSS protection(sanitize request data)
app.use(xss());

/* COMPRESS */
// gzip compression
app.use(compression());

/* Request limiter */
// Request limiter for all guest API
if (envConfig.nodeEnv === constantUtilService.PROD_ENV) {
  app.use(constantUtilService.API_V1_GUEST, unauthReqLimiter);
}

/* ROUTE */
// API doc route
if (
  envConfig.nodeEnv === constantUtilService.DEV_ENV ||
  envConfig.nodeEnv === constantUtilService.LOCAL_ENV
) {
  app.use(constantUtilService.DOCS_V1, mwCheckApiDocAccess, docRoute);
}
// Unauth route
app.use(constantUtilService.API_V1_GUEST, mwCheckAppAccess, unAuthRoute);
// Auth route
app.use(
  constantUtilService.API_V1_USER,
  mwCheckAppAccess,
  mwCheckPrivateRoute,
  authRoute
);
// Auth route
app.use(
  constantUtilService.API_V1_ORDER_MANAGEMENT,
  mwCheckAppAccess,
  authRoute
);

/* ERROR HANDLING */
// Send back a 404 error for any unknown api request.
app.use(mwCheckUnknownAPIRequest);
// Handle error in MW.
app.use(mwHandleErrors);

module.exports = app;
