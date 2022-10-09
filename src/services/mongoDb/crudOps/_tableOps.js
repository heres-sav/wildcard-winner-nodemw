const { ObjectId } = require('mongodb');
const { OrderManagementDB } = require("../client");
const { getDatetime } = require("../../utils/helperUtilService");

const _tableCollection = OrderManagementDB.collection("_table");
const _itemOutlineCollection = OrderManagementDB.collection("_itemOutline");

const read = async (payload) => _tableCollection
  .findOne({ "_id": ObjectId(payload._id) })

const readAll = () => _tableCollection.find().toArray()

const createOne = async (payload) => {
  const {
    unique
  } = payload;
  const result = await _tableCollection
  .insertOne({
    unique,
    occupied: false,
    orders: {}
  })
  return result;
}

const pushOrder = async (payload) => {
  try {
    const {
      _id,
      order: {
        items
      }
    } = payload;
    // const orderItems = {}
    for(const each in items) {
    //   const orderItem = { ...items[each] }
    //   orderItem.cooked = false
    //   orderItem.served = false
    //   orderItem.time = getDatetime()
    //   orderItems.push(orderItem)
      items[each].cooked = false
      items[each].served = false
      items[each].time = getDatetime()
    }
    
    const table = await _tableCollection
    .findOne({ "_id": ObjectId(_id) })
    
    const { orders } = table
    orders[getDatetime()] = { items }
    const {
      acknowledged,
      modifiedCount,
      upsertedId,
      upsertedCount,
      matchedCount
    } = await _tableCollection
    .updateOne({ "_id": ObjectId(_id) }, {
      $set: {
        occupied: true,
        orders
      }
    });
    if(acknowledged) return {
      _id,
      occupied: true,
      orders
    }
    return table;
  }
  catch (ex) {
    return ex;
  }
}

const updateOrder = async (payload) => {
  try {
    const {
      _id,
      timestamp,
      order: {
        items
      }
    } = payload;
    const orderItems = []
    items.forEach(each => {
      const orderItem = { ...each }
      orderItem.cooked = false
      orderItem.served = false
      orderItem.time = getDatetime()
      orderItems.push(orderItem)
    })
    const table = await _tableCollection
    .findOne({ "_id": ObjectId(_id) })

    const { orders } = table
    orders[timestamp] = { items: orderItems }
    const {
      acknowledged,
      modifiedCount,
      upsertedId,
      upsertedCount,
      matchedCount
    } = await _tableCollection
    .updateOne({ "_id": ObjectId(_id) }, {
      $set: {
        occupied: true,
        orders
      }
    });
    if(acknowledged) return {
      _id,
      occupied: true,
      orders
    }
    return table;
  }
  catch (ex) {
    return ex;
  }
}

module.exports = {
  read,
  readAll,
  createOne,
  pushOrder,
  updateOrder
};
