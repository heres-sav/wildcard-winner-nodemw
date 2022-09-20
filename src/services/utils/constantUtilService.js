module.exports = {
  /** *******
   * GENERAL
   ********* */
  // Environment
  PROD_ENV: "production",
  DEV_ENV: "development",
  TEST_ENV: "test",
  LOCAL_ENV: "localhost",
  DEBUG_MODE_ON: "on",
  DEBUG_MODE_OFF: "off",

  // Static str
  ERROR_STR: "ERROR",
  SUCCESS_STR: "SUCCESS",
  KEY_STR: "key",

  // Logger str
  ERROR: "error",
  DEBUG: "debug",
  INFO: "info",

  // Joi related
  REQ_OBJ_HOLDER_ARR: ["params", "query", "body"],

  // Characters
  COMMA_STR: ",",
  COMMA_SPACE_STR: ", ",
  BLANK_STR: "",
  COLON_STR: ":",
  FORWARD_SLACE_STR: "/",
  NEW_LINE_STR: "\n",
  MESSAGE_STR: "message",
  REMOTE_ADDR_STR: ":remote-addr - ",

  // Related to date
  DATE_DD_MM_YYYY_FORMATE: "DD/MM/YYYY",
  DATE_MM_DD_YYYY_FORMATE: "MM-DD-YYYY",
  YEAR_STR: "year",

  // INTEGER Values
  INT_100: 100,
  SALT_ROUNDS: 10,

  // Server process error event names
  UNCAUGHT_EXEPTION_EVENT: "uncaughtException",
  UNHANDLED_REJECTION_EVENT: "unhandledRejection",
  SIGTERM_EVENT: "SIGTERM",

  /** *****
   * REGEX
   ******* */
  // Common
  REGX_ALL_SPACES: /\s+/g,
  REGX_EXCEPTION_FILE_PATH: /\((.*):(\d+):(\d+)\)$/,

  // Field sepecific
  NAME_REREX: "^[a-zA-Z\\s,.'-]+$",
  SSN_REREX: "^(([0-9]{6}\\s[0-9]{5})|[0-9]{11})$",
  SSN_DOB_REGEX: "^(0[1-9]|1[012])$",
  PASSWORD_REREX_8LN: "^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$", // Minimum 8 characters, at least one letter and one number
  PASSWORD_REREX_8ULN: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$", // Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number
  PASSWORD_REREX_8LNS:
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$", // Minimum 8 characters, at least one letter, one number and one special character
  PASSWORD_REREX_8ULNS:
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  PASSWORD_REREX_8ULNS16:
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$", // Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character

  /** ************
   * APIs RELATED
   ************** */

  // General
  OAUTH_STR: "OAuth ",
  HOST_STR: "host",

  // FE API Endpoint Base URL
  API_V1_GUEST: "/api/v1/guest",
  API_V1_USER: "/api/v1/user",

  // DOCS API Endpoint Base URL
  DOCS_V1: "/docs/v1/",

  // FE APIs End Point URLs
  // Guest
  USER_LOGIN_FE_API: "/signin",
  USER_SIGNUP_FE_API: "/signup",
  // Loggedin
  GET_ALL_LOAN_LIST_FE_API: "/investor/loanlist",

  // APIs Request & Response Header
  X_POWERED_BY_STR: "X-Powered-By",
  X_FORWARDED_FOR: "x-forwarded-for",
  AUTH_TOKEN_STR: "x-auth-token",
  API_KEY_STR: "x-api-key",

  // Request Method
  HTTP_GET_STR: "GET",

  // Req & Res Static str
  APP_NAME_STR: "name",
  LAI_NAME_STR: "loanName",
  REQ_LOAN_AMT_STR: "requestedLoanAmount",
  LOAN_TERM_STR: "loanTerm",
  PER_FUNDED_STR: "percentFunded",
  LOAN_PURPOSE_STR: "loanPurpose",
  INTEREST_RATE_STR: "interestRate",
  ADDITIONAL_INFO: "additionalInformation",
  CREDIT_BAND_TYPE: "creditBandType",

  // REQ limiter config
  WINDOWMS_REQ_LIMITER: 5 * 60 * 1000,
  MAX_LIMIT_REQ_LIMITER: 5,

  // SF APIs End Point URLs
  SIGNUP_SF_API: {
    URL: "/services/apexrest/signup",
    METHOD: "POST",
    CONTENT_TYPE: "application/json",
  },

  SIGNIN_SF_API: {
    URL: "/services/apexrest/signin",
    METHOD: "POST",
    CONTENT_TYPE: "application/json",
  },

  GET_ALL_LOAN_LIST_SF_API: {
    URL: "/services/apexrest/getAllLoanApplication",
    METHOD: "GET",
    CONTENT_TYPE: "application/json",
  },

  
};
