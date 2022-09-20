/** ****************************************************************************************************************
 * Name                 :   authRoute
 * Description          :   It handle all the auth routes.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const router = require("express").Router();
const {
  getAllLoanListHandler,
} = require("../../controllers/investor-ctrl/allLoanListCtrl");
const constantUtilService = require("../../services/utils/constantUtilService");

// Async API callout error handler.
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// All ROUTES

// Get all loan list.
router.get(
  constantUtilService.GET_ALL_LOAN_LIST_FE_API,
  catchAsync(getAllLoanListHandler)
);

module.exports = router;
