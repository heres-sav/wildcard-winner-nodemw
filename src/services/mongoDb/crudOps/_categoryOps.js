const { OrderManagementDB } = require("../client");

const _categoryCollection = OrderManagementDB.collection("_category");

const create = async (payload) => {
  const data = {...payload}
  data.items = {}
  const {
    acknowledged,
    upsertedId
  } = await _categoryCollection
  .insertOne(data)
  if(acknowledged)
    return {
      _id: upsertedId,
      ...data
    }
  return {}
}

const readAll = () => _categoryCollection.find().toArray()

module.exports = {
  create,
  readAll
}