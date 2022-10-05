const { OrderManagementDB } = require("../client");

const _categoryCollection = OrderManagementDB.collection("_category");

const create = async (payload) => {
  await _categoryCollection
  .insertOne(payload)
}

const readAll = () => _categoryCollection.find().toArray()

module.exports = {
  create,
  readAll
}