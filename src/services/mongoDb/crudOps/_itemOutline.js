const ObjectId = require('mongodb').ObjectId
const { OrderManagementDB } = require("../client");
const responseWebService = require("../../web/responseWebService");
const helperUtilService = require("../../utils/helperUtilService");

const create = async (req, res) => {
  try {
    console.log("create called item outline");
    const result = await OrderManagementDB
    .collection("_itemOutline")
    .insertOne(req.body)
    console.log(result);
    const category = await OrderManagementDB
    .collection("_category")
    .findOne({ _id : ObjectId(req.body.categoryId)})
    console.log("category");
    console.log(category);
    const items = category.items ? category.items : []
    items.push(req.body)
    await OrderManagementDB
    .collection("_category")
    .updateOne(
      { _id : ObjectId(req.body.categoryId)},
      { $set: { items } }
    )

    responseWebService.handleResponseStringified(
      res,
      helperUtilService.genApiResponse(
        true,
        "successfully inserted maybe"
      )
    );
  }
  catch (ex) {
    responseWebService.handleResponseStringified(
      res,
      helperUtilService.genApiResponse(true, ex)
    );
  }
}

module.exports = {
  create
}