/** ****************************************************************************************************************
 * Name                 :   userSignupCtrl
 * Description          :   It is handler for signup related request.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   17/03/2022
 ***************************************************************************************************************** */

const responseWebService = require("../../services/web/responseWebService");
const helperUtilService = require("../../services/utils/helperUtilService");
const { encryptData } = require("../../services/utils/encryptUtilService");
const {
  signupApiCall,
} = require("../../services/web/api/common-api/userSignupApiCall");

/** *********
 // HANDLERS
  ********** */

// USER SIGNUP HANDLER.
const userSignupHandler = async (req, res) => {
  // Create requst data for API callout.
  const reqData = {
    name: req.body.name,
    userSsn: req.body.userSsn,
    password: await encryptData(req.body.password),
  };
  // Call all loan list api.
  const signupApiRes = await signupApiCall(reqData);
  // Response handle
  responseWebService.handleResponseStringified(
    res,
    helperUtilService.genApiResponse(true, signupApiRes)
  );
};

module.exports = {
  userSignupHandler,
};
