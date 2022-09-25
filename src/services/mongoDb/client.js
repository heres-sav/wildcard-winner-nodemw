const { MongoClient } = require("mongodb");
const envConfig = require("../../conf/envConfig");
const client = new MongoClient(envConfig.atlasUri);
const OrderManagementDB = client.db("OrderManagement");
const _itemOutline_v = require("./validation/_itemOutline");
const _category_v = require("./validation/_category");
const _itemInstance_v = require("./validation/_itemInstance");

const init = async () => {
  const orderManagementDBColls = {}
  
  await client.connect();
  await OrderManagementDB
  .listCollections()
  .forEach((collInfos) => {
    if(collInfos) orderManagementDBColls[collInfos.name] = true
  });
  // Validation on collections
  if(!orderManagementDBColls["_itemOutline"])
    OrderManagementDB.createCollection("_itemOutline", _itemOutline_v);
  if(!orderManagementDBColls["_category"])
    OrderManagementDB.createCollection("_category", _category_v);
  if(!orderManagementDBColls["_itemInstance"])
    OrderManagementDB.createCollection("_itemInstance", _itemInstance_v);
}


module.exports = {
  init,
  OrderManagementDB
};