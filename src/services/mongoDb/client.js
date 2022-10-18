const { MongoClient } = require("mongodb");
const envConfig = require("../../conf/envConfig");

const client = new MongoClient(envConfig.atlasUri);
const OrderManagementDB = client.db("OrderManagement");
const _processedOrders_v = require("./validation/_processedOrder");
const _itemOutline_v = require("./validation/_itemOutline");
const _category_v = require("./validation/_category");
const _table_v = require("./validation/_table");
const _orgConfiguration_v = require("./validation/_orgConfiguration");

const init = async () => {
  const orderManagementDBColls = {}
  
  await client.connect();
  await OrderManagementDB
  .listCollections()
  .forEach((collInfos) => {
    if(collInfos) orderManagementDBColls[collInfos.name] = true
  });
  // Validation on collections
  // if(!orderManagementDBColls["_itemOutline"])
  //   OrderManagementDB.createCollection("_itemOutline", _itemOutline_v);
  if(!orderManagementDBColls._processedOrder)
  OrderManagementDB.createCollection("_processedOrder", _processedOrders_v);
  if(!orderManagementDBColls._category)
    OrderManagementDB.createCollection("_category", _category_v);
  if(!orderManagementDBColls._table)
    OrderManagementDB.createCollection("_table", _table_v);
  
  // if(!orderManagementDBColls._orgConfiguration)
  //   OrderManagementDB.createCollection("_orgConfiguration", _orgConfiguration_v);
}


module.exports = {
  init,
  OrderManagementDB
};