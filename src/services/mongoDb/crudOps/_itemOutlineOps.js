const { ObjectId } = require('mongodb')
const { OrderManagementDB } = require("../client");

const _categoryCollection = OrderManagementDB.collection("_category");
const _itemOutlineCollection = OrderManagementDB.collection("_itemOutline");

const create = async (payload) => {
  const { categoryId } = payload
  const category = await _categoryCollection
  .findOne({ _id : ObjectId(categoryId)})
  const items = category.items ? category.items : []
  items.push(payload)
  await _categoryCollection
  .updateOne(
    { _id : ObjectId(categoryId)},
    { $set: { items } }
  )

  const {
    acknowledged
  } = await _itemOutlineCollection
  .insertOne({
    categoryName: category.name,
    ...payload
  })
  if(acknowledged) return {
    categoryName: category.name,
    ...payload
  }
  return {};
}

const update = async (payload) => {
  const { categoryId } = payload
  const category = await _categoryCollection
  .findOne({ _id : ObjectId(categoryId)})
  // const items = category.items ? category.items : []
  // items.push(payload)
  // await _categoryCollection
  // .updateOne(
  //   { _id : ObjectId(categoryId)},
  //   { $set: { items } }
  // )
  const {
    name,
    inStock,
    sellingCost,
    type,
  } = payload;
  const {
    acknowledged
  } = await _itemOutlineCollection
  .updateOne(
    { _id : ObjectId(payload._id)},
    { $set: {
        categoryName: category.name,
        categoryId,
        name,
        inStock,
        sellingCost,
        type,
      }
    }
  )
  if(acknowledged) return {
    categoryName: category.name,
  }
  return {};
}

const readAll = () => _itemOutlineCollection.find().toArray()

module.exports = {
  create,
  update,
  readAll
}