/** ****************************************************************************************************************
 * Name                 :   mwReqRateLimiter
 * Description          :   It containe all the limiter config for requests.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   15/03/2022
 ***************************************************************************************************************** */

const rateLimiter = require("express-rate-limit");
const constantUtilService = require("../services/utils/constantUtilService");
const msgUtilService = require("../services/utils/msgUtilService");
const { TooManyRequest } = require("../services/web/errorWebService");

// Config unauth req limiter
const unauthReqLimiter = rateLimiter({
  windowMs: constantUtilService.WINDOWMS_REQ_LIMITER,
  max: constantUtilService.MAX_LIMIT_REQ_LIMITER,
  skipSuccessfulRequests: true,
  message: msgUtilService.REQ_LIMIT_EXCEEDED_MSG,
  headers: false,
  handler: (req, res, next, options) => {
    throw new TooManyRequest(options.message);
  },
});

module.exports = {
  unauthReqLimiter,
};
