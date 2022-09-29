const ObjectId = require('mongodb').ObjectId
const { OrderManagementDB } = require("../client");
const _tableCollection = OrderManagementDB.collection("_table");
const { getTimestamp, getDatetime } = require("../../utils/helperUtilService");

const read = async (payload) => {
  return await _tableCollection
  .findOne({ "_id": ObjectId(payload._id) })
}

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
    each.time = getDatetime()
  })
  const table = await _tableCollection
  .findOne({ "_id": ObjectId(_id) })
  const orders = table.orders
  orders[getTimestamp()] = order
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
    each.time = getDatetime()
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
  read,
  readAll,
  createOne,
  pushOrder,
  updateOrder
};
