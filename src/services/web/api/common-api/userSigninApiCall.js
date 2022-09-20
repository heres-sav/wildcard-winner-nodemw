/** ****************************************************************************************************************
 * Name                 :   userSigninApiCall
 * Description          :   It handle the login process API request callouts.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   20/03/2022
 ***************************************************************************************************************** */

const envConfig = require("../../../../conf/envConfig");
const constantUtilService = require("../../../utils/constantUtilService");
const requestWebService = require("../../requestWebService");

/** *********
  // HANDLERS
   ********** */

// GET ALL LOAN LIST THROUGH API CALL>
const signinApiCall = async (params) => {
  // Request body create
  const reqParams = {
    ...params,
  };
  // For test running
  if (envConfig.nodeEnv === constantUtilService.TEST_ENV) {
    const sampleResData = {
      userSsn: params.userSsn,
    };
    return sampleResData;
  }
  // Request send.
  const signinApiCallRes = await requestWebService.sendSfApiRequest(
    constantUtilService.SIGNIN_SF_API,
    reqParams
  );
  return signinApiCallRes.data;
};

module.exports = {
  signinApiCall,
};
