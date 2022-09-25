/** ****************************************************************************************************************
 * Name                 :   authRoute
 * Description          :   It handle all the auth routes.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const router = require("express").Router();
const constantUtilService = require("../../services/utils/constantUtilService");
const _itemOutline_crud = require("../../services/mongoDb/crudOps/_itemOutline");
const _category_crud = require("../../services/mongoDb/crudOps/_category");
// Async API callout error handler.
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

router.post(
  constantUtilService.CREATE_ITEM_OUTLINE,
  catchAsync(_itemOutline_crud.create)
);

router.post(
  constantUtilService.CREATE_CATEGORY,
  catchAsync(_category_crud.create)
);

module.exports = router;
