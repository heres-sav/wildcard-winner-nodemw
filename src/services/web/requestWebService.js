/** ****************************************************************************************************************
 * Name                 :   requestWebService
 * Description          :   It handle the all API request callouts.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/03/2022
 ***************************************************************************************************************** */

const axios = require("axios");
const { ReasonPhrases } = require("http-status-codes");
const envConfig = require("../../conf/envConfig");
const constantUtilService = require("../utils/constantUtilService");
const logger = require("../utils/loggerUtilService");
const msgUtilService = require("../utils/msgUtilService");
const salesforceAuthWebService = require("./auth/salesforceAuthWebService");
const { BadGateway } = require("./errorWebService");

// SEND SF API REQUEST
const sendSfApiRequest = async (apiDetails, params) => {
  try {
    // Authenticate with SF.
    const sfAuthRes = await salesforceAuthWebService.login();
    if (!sfAuthRes || !sfAuthRes.access_token)
      throw new BadGateway(msgUtilService.SOMETHING_WENT_WRONG);
    if (
      envConfig.nodeEnv !== constantUtilService.TEST_ENV &&
      envConfig.debugMode === constantUtilService.DEBUG_MODE_ON
    ) {
      logger.info(`REQUEST PARAMS : ${JSON.stringify(params)}`);
      logger.info(
        `SF API ENDPOINT : ${sfAuthRes.instance_url}${apiDetails.URL}`
      );
    }
    // Axios auth instance create to call SF API endpoints.
    const axiosReqInst = axios.create({
      baseURL: sfAuthRes.instance_url,
      headers: {
        "Content-Type": apiDetails.CONTENT_TYPE,
        Authorization: constantUtilService.OAUTH_STR + sfAuthRes.access_token,
      },
    });
    // If GET request
    if (
      apiDetails.METHOD &&
      apiDetails.METHOD === constantUtilService.HTTP_GET_STR
    ) {
      const apiUrl = `${apiDetails.URL}?${new URLSearchParams(
        params
      ).toString()}`;
      return await axiosReqInst.get(apiUrl);
    }
    // If POST request
    return await axiosReqInst.post(apiDetails.URL, params);
  } catch (exp) {
    if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
      logger.error(exp.message);
    throw new BadGateway(ReasonPhrases.BAD_GATEWAY);
  }
};

module.exports = {
  sendSfApiRequest,
};
