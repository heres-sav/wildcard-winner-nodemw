const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
const { BaseError } = require("../services/web/errorWebService");

dotenv.config({ path: path.join(__dirname, "../../.env") });

// Environment variable joe schema object create
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test", "localhost")
      .required()
      .description("node environment"),
    PORT: Joi.number().default(8000).description("server port"),
    DEBUG_MODE: Joi.string()
      .valid("on", "off")
      .required()
      .description(
        "debug mode on/off to show/hide the api req and res related loges"
      ),
    MW_ACCESS_KEY: Joi.string().required().description("mw access key"),
    JSON_BODY_SIZE_LIMIT: Joi.string()
      .required()
      .description("json body size limit"),
    MW_SERVER_URL: Joi.string().description("middleware server url"),
    WHITE_LISTED_DOMAINS: Joi.string()
      .required()
      .description("whitelisted domains for cors"),
    WHITE_LISTED_REQ_METHODS: Joi.string()
      .required()
      .description("whitelisted http methods for cors"),
    WHITE_LISTED_IP_LIST: Joi.string().description(
      "whitelisted ip to access the api documents"
    ),
    WHITE_LISTED_CUSTOM_HEADER: Joi.string().description(
      "whitelisted custom headers to expose in response."
    ),
    JWT_TOKEN_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_EXPIRE_TIME: Joi.string()
      .default(30)
      .description("minutes after which access tokens expire"),
    MONGO_CLUSTER0_USERNAME: Joi.string().required().description("mondodb cluster0 user username"),
    MONGO_CLUSTER0_PASSWORD: Joi.string().required().description("mondodb cluster0 user password")
  })
  .unknown();

// Validating the env schema
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

// Thorw error if error
if (error) {
  throw new BaseError(`Config validation error: ${error.message}`);
}

module.exports = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  debugMode: envVars.DEBUG_MODE,
  mwAccessKey: envVars.MW_ACCESS_KEY,
  jsonBodySizeLimit: envVars.JSON_BODY_SIZE_LIMIT,
  mwServerDomain: envVars.MW_SERVER_DOMAIN,
  whiteListed: {
    domain: envVars.WHITE_LISTED_DOMAINS,
    reqMethods: envVars.WHITE_LISTED_REQ_METHODS,
    ipForApiDocAccess: envVars.WHITE_LISTED_IP_LIST,
    customHeaders: envVars.WHITE_LISTED_CUSTOM_HEADER,
  },
  jwt: {
    tokenSecret: envVars.JWT_TOKEN_SECRET,
    expireTime: envVars.JWT_EXPIRE_TIME,
  },
  dbCreds: {
    username: envVars.MONGO_CLUSTER0_USERNAME,
    password: envVars.MONGO_CLUSTER0_PASSWORD
  },
};
