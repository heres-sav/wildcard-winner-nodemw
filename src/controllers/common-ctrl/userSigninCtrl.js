/** ****************************************************************************************************************
 * Name                 :   userLoginCtrl
 * Description          :   It is handler for login related request.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const { genAuthToken } = require("../../services/web/auth/authTokenService");
const responseWebService = require("../../services/web/responseWebService");
const constantUtilService = require("../../services/utils/constantUtilService");
const helperUtilService = require("../../services/utils/helperUtilService");
const {
  signinApiCall,
} = require("../../services/web/api/common-api/userSigninApiCall");

/** *********
// HANDLERS
 ********** */

// USER SIGNIN HANDLER.
const userSigninHandler = async (req, res) => {
  // Call signin api.
  const signinApiRes = await signinApiCall(req.body);
  // Create & set auth token for the loggedin user.
  const authToken = genAuthToken(req.body);
  res.header(constantUtilService.AUTH_TOKEN_STR, authToken);
  // Response handle
  responseWebService.handleResponseStringified(
    res,
    helperUtilService.genApiResponse(true, signinApiRes)
  );
};

module.exports = {
  userSigninHandler,
};
