const { ObjectId } = require('mongodb');
const { OrderManagementDB } = require("../client");
const { getDatetime } = require("../../utils/helperUtilService");
const _categoryOps = require('./_categoryOps');

const _tableCollection = OrderManagementDB.collection("_table");
const _processedOrderCollection = OrderManagementDB.collection("_processedOrder");
const { processTable } = require('../../utils/databaseUtil');

const read = async payload => _tableCollection
  .findOne({ "_id": ObjectId(payload._id) })

const readAll = () => _tableCollection.find().toArray()

const createOne = async payload => {
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

const pushOrder = async payload => {
  try {
    const {
      _id,
      order: {
        items
      }
    } = payload;
    for(const each in items) {
      items[each].cooked = false
      items[each].served = false
      items[each].time = getDatetime()
    }
    
    const table = await _tableCollection
    .findOne({ "_id": ObjectId(_id) })
    
    const { orders } = table
    const stamp = getDatetime()
    orders[stamp] = {
      items,
      name: stamp
    }
    const {
      acknowledged
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
    return {};
  }
  catch (ex) {
    return ex;
  }
}

const updateOrder = async payload => {
  try {
    const {
      _id,
      timestamp,
      order: {
        items
      }
    } = payload;
    for(const each in items) {
      items[each].cooked = false
      items[each].served = false
      items[each].time = getDatetime()
    }
    
    const table = await _tableCollection
    .findOne({ "_id": ObjectId(_id) })

    const { orders } = table
    orders[timestamp] = {
      items,
      name: timestamp
    }
    const {
      acknowledged
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
    return {};
  }
  catch (ex) {
    return ex;
  }
}

const clearStamp = async payload => {
  try {
    const {
      _id,
      timestamp
    } = payload;
    const table = await _tableCollection
    .findOne({ "_id": ObjectId(_id) })

    const { orders } = table
    const ordersClone = {...orders}
    if(ordersClone[timestamp]) {
      delete ordersClone[timestamp]
    }
    const {
      acknowledged
    } = await _tableCollection
    .updateOne({ "_id": ObjectId(_id) }, {
      $set: {
        occupied: true,
        orders: ordersClone
      }
    });
    if(acknowledged) return {
      _id,
      occupied: true,
      orders: ordersClone
    }
    return {};
  }
  catch (ex) {
    return ex;
  }
}

const clearTable = async payload => {
  try {
    const {_id} = payload;
    const {
      acknowledged
    } = await _tableCollection
    .updateOne({ "_id": ObjectId(_id) }, {
      $set: {
        occupied: false,
        orders: {}
      }
    })
    if(acknowledged) return {
      _id,
      occupied: false,
      orders: {}
    }
    return {};
  }
  catch (ex) {
    return ex;
  }
}

const processOrderPreview = async payload => {
  try {
    const {_id} = payload;
    const table = await _tableCollection
    .findOne({ "_id": ObjectId(_id) })
    const categories = await _categoryOps.readAll();
    return processTable(table, categories)
  }
  catch (ex) {
    return ex;
  }
}

const processOrder = async payload => {
  try {
    const {_id} = payload;
    const table = await _tableCollection
    .findOne({ "_id": ObjectId(_id) })
    if(!table.occupied) return {}
    const categories = await _categoryOps.readAll();
    const processed = processTable(table, categories)
    const {
      acknowledged
    } = await _processedOrderCollection
    .insertOne(processed)
    if(acknowledged) {
      return clearTable({_id})
    }
    return {}
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
  updateOrder,
  clearStamp,
  clearTable,
  processOrderPreview,
  processOrder
};
