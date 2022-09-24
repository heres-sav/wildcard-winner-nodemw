const { MongoClient } = require("mongodb");
const envConfig = require("../../conf/envConfig");
const client = new MongoClient(envConfig.atlasUri);
const _itemOutlineValidator = require("./validation/_itemOutline");

const OrderManagementDB = client.db("OrderManagement");
// Validation on collections
if(false)
  OrderManagementDB.createCollection("_itemOutline", {
    validator: _itemOutlineValidator
  });

module.exports = {
  client,
  OrderManagementDB
};