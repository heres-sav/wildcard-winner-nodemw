const router = require("express").Router();
const constantUtilService = require("../../services/utils/constantUtilService");
const _itemOutline_crud = require("../../services/mongodb/crudOps/_itemOutline");
const _category_crud = require("../../services/mongodb/crudOps/_category");
const {
  createATable,
  getTableIds,
  addOrderOnTable,
  updateOrderOnTable
} = require("../../handlers/request/tableCtrl");

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

router.get(
  constantUtilService.CREATE_TABLE,
  catchAsync(createATable)
);

router.get(
  constantUtilService.READ_TABLES,
  catchAsync(getTableIds)
);

router.post(
  constantUtilService.ADD_ORDER_ONTABLE,
  catchAsync(addOrderOnTable)
);

router.post(
  constantUtilService.UPDATE_ORDER_ONTABLE,
  catchAsync(updateOrderOnTable)
);

module.exports = router;
