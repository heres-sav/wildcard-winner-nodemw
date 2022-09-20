/** ****************************************************************************************************************
 * Name                 :   userSignupApiCall
 * Description          :   It handle the registration process API request callouts.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   23/03/2022
 ***************************************************************************************************************** */

const envConfig = require("../../../../conf/envConfig");
const constantUtilService = require("../../../utils/constantUtilService");
const requestWebService = require("../../requestWebService");

/** *********
 // HANDLERS
  ********** */

// GET ALL LOAN LIST THROUGH API CALL>
const signupApiCall = async (params) => {
  // Request body create
  const reqParams = {
    ...params,
  };
  // For test running
  if (envConfig.nodeEnv === constantUtilService.TEST_ENV) {
    const sampleResData = {
      name: params.name,
      userSsn: params.userSsn,
    };
    return sampleResData;
  }
  // Request send.
  const signupApiCallRes = await requestWebService.sendSfApiRequest(
    constantUtilService.SIGNUP_SF_API,
    reqParams
  );
  return signupApiCallRes.data;
};

module.exports = {
  signupApiCall,
};
