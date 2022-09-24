/** ****************************************************************************************************************
 * Name                 :   authRoute
 * Description          :   It handle all the auth routes.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const router = require("express").Router();
const constantUtilService = require("../../services/utils/constantUtilService");
const {
  createItemOutline,
  updateItemOutline
} = require("../../services/mongoDb/crudOps/_itemOutline");
// Async API callout error handler.
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// All ROUTES

// Get all loan list.
router.post(
  constantUtilService.CREATE_ITEM,
  catchAsync(createItemOutline)
);

module.exports = router;
