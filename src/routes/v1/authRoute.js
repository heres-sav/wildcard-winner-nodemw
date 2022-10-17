const router = require("express").Router();
const constantUtilService = require("../../services/utils/constantUtilService");
const _itemOutlineOps = require("../../services/mongoDb/crudOps/_itemOutlineOps");
// const _tableOps = require("../../services/mongodb/crudOps/_tableOps");
// const _categoryOps = require("../../services/mongodb/crudOps/_categoryOps");
const {
  createTableSchema,
  addOrderOnTableSchema,
  updateOrderOnTableSchema
} = require("../../services/validation/schema/tableCtrlSchema");
const { createCategorySchema } = require("../../services/validation/schema/categoryCtrlSchema");
const reqValidate = require("../../services/validation/validate");
const { handleResponseStringified } = require("../../services/web/responseWebService");

// Async API callout error handler.
const catchAsync = (fn) => async (req, res) => {
  try {
    const result = await fn(req.body, res)
    handleResponseStringified(res, result)
  }
  catch(ex) {
    handleResponseStringified(res, {
      error: {
        message: ex.message
      }
    })
  }
};

router.post(
  constantUtilService.CREATE_ITEM_OUTLINE,
  catchAsync(_itemOutlineOps.create)
);

router.post(
  constantUtilService.UPDATE_ITEM_OUTLINE,
  catchAsync(_itemOutlineOps.update)
);

router.get(
  constantUtilService.READ_ITEM_OUTLINE,
  catchAsync(_itemOutlineOps.readAll)
);

// Category APIs
// router.post(
//   constantUtilService.CREATE_CATEGORY,
//   reqValidate(createCategorySchema),
//   catchAsync(_categoryOps.create)
// );

// router.get(
//   constantUtilService.READ_CATEGORY,
//   catchAsync(_categoryOps.readAll)
// );

// router.post(
//   constantUtilService.CREATE_TABLE,
//   reqValidate(createTableSchema),
//   catchAsync(_tableOps.createOne)
// );

// router.get(
//   constantUtilService.READ_TABLES,
//   catchAsync(_tableOps.readAll)
// );

// router.post(
//   constantUtilService.ADD_ORDER_ONTABLE,
//   reqValidate(addOrderOnTableSchema),
//   catchAsync(_tableOps.pushOrder)
// );

// router.post(
//   constantUtilService.UPDATE_ORDER_ONTABLE,
//   reqValidate(updateOrderOnTableSchema),
//   catchAsync(_tableOps.updateOrder)
// );

// router.post(
//   constantUtilService.CLEAR_TABLE_ONTABLE,
//   // reqValidate(updateOrderOnTableSchema),
//   catchAsync(_tableOps.clearTable)
// );

// router.post(
//   constantUtilService.CLEAR_STAMP_ONTABLE,
//   // reqValidate(updateOrderOnTableSchema),
//   catchAsync(_tableOps.clearStamp)
// );

// router.post(
//   constantUtilService.PROCESS_ORDER_PREVIEW,
//   // reqValidate(updateOrderOnTableSchema),
//   catchAsync(_tableOps.processOrderPreview)
// );

// router.post(
//   constantUtilService.PROCESS_ORDER,
//   // reqValidate(updateOrderOnTableSchema),
//   catchAsync(_tableOps.processOrder)
// );

module.exports = router;
