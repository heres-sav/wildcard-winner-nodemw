const ObjectId = require('mongodb').ObjectId
const { OrderManagementDB } = require("../client");
const _tableCollection = OrderManagementDB.collection("_table");

const readAll = async () => {
  const tableRes = []
  const result = _tableCollection.find();
  await result.forEach(each => {
    tableRes.push(each)
  })
  return tableRes;
}

const createOne = async (payload) => {
  const result = await _tableCollection
  .insertOne(payload)
  return result;
}

const pushOrder = async (payload) => {
  const {
    _id,
    order
  } = payload;
  const { items } = order
  items.forEach(each => {
    each.time = "12:00PM"
  })
  const orders = {}
  orders["12:00PM::15/06/2022"] = order
  console.log(orders);
  const result = await _tableCollection
  .updateOne({ "_id": ObjectId(_id) }, {
    $set: {
      occupied: true,
      orders
    }
  });
  return result;
}

const updateOrder = async (payload) => {
  const {
    _id,
    timestamp,
    order
  } = payload;
  const { items } = order
  items.forEach(each => {
    each.time = "12:00PM"
  })
  const table = await _tableCollection
  .findOne({ "_id": ObjectId(_id) })
  const orders = table.orders
  orders[timestamp] = order
  const result = await _tableCollection
  .updateOne({ "_id": ObjectId(_id) }, {
    $set: {
      occupied: true,
      orders
    }
  });
  return result;
}

module.exports = {
  createOne,
  readAll,
  pushOrder,
  updateOrder
};
