const { OrderManagementDB } = require("../client");
const responseWebService = require("../../web/responseWebService");
const helperUtilService = require("../../utils/helperUtilService");

const createItemOutline = async (req, res) => {
  try {
    await OrderManagementDB.collection("_itemOutline").insertOne(req.body)
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

const updateItemOutline = (data) => {
  OrderManagementDB._itemOutline.insertOne(data)
}

module.exports = {
  createItemOutline,
  updateItemOutline
}