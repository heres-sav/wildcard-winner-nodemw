/** ****************************************************************************************************************
 * Name                 :   unAuthRoute
 * Description          :   It handle all the unauth routes.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const router = require("express").Router();
const constantUtilService = require("../../services/utils/constantUtilService");
const reqValidate = require("../../services/validation/validate");
const unauthSchema = require("../../services/validation/schema/unauthSchema");

// Async API callout error handler.
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// ALL ROUTES

// User login.
// router.post(
//   constantUtilService.USER_LOGIN_FE_API,
//   reqValidate(unauthSchema.signin),
//   catchAsync(userSigninHandler)
// );

module.exports = router;
