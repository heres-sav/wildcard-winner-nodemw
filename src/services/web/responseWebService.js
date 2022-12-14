const envConfig = require("../../conf/envConfig");
const constantUtilService = require("../utils/constantUtilService");
const msgUtilService = require("../utils/msgUtilService");

const responseWebService = {
  handleResponseStringified: (res, apiData) => {
    res.setHeader('Content-Type', 'application/json');
    if (
      envConfig.debugMode === constantUtilService.DEBUG_MODE_ON &&
      envConfig.nodeEnv !== constantUtilService.TEST_ENV
    )
      if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
        // logger.info(`JSON RESPONSE FROM API : ${JSON.stringify(apiData)}`);
    if (!res || !apiData) throw new Error(msgUtilService.SOMETHING_WENT_WRONG);
    // Remove x powered by header from response header for security
    res.removeHeader(constantUtilService.X_POWERED_BY_STR);
    res.end(JSON.stringify(apiData));
  },
};

module.exports = responseWebService;
