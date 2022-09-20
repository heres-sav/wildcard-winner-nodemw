const envConfig = require("../../../conf/envConfig");
const constantUtilService = require("../../utils/constantUtilService");
const logger = require("../../utils/loggerUtilService");
const orgConnection = require("./salesforceConnectWebService");

// GLOBAL VARIABLE
// eslint-disable-next-line no-unused-vars
let isConnected = false;

// CONNECT WITH DB
const org = orgConnection;

const salesforceAuthWebService = {
  // LOGIN WITH SALESFORCE
  login: async () => {
    try {
      const { username, password } = envConfig.sfConnectDetails;
      // Authenticat with SF.
      const orgConnectRes = await org.authenticate({ username, password });
      if (orgConnectRes) {
        isConnected = true;
        if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
          logger.info("USER LOGGEDIN SUCCESSFULLY.");
        return orgConnectRes;
      }
      if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
        logger.info("UNABLE TO LOGIN WITH SF.");
      return null;
    } catch (exp) {
      return null;
    }
  },
};

module.exports = salesforceAuthWebService;
