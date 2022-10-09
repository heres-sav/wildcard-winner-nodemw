const { ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid');
const { OrderManagementDB } = require("../client");

const _categoryCollection = OrderManagementDB.collection("_category");
const _itemOutlineCollection = OrderManagementDB.collection("_itemOutline");

// Priority 1 to fix the following operation first
const create = async (payload) => {
  const {
    categoryId
  } = payload
  const category = await _categoryCollection
  .findOne({ _id : ObjectId(categoryId)})
  if(category) {
    const { items } = category
    const generatedId = uuidv4()
    if(Object.prototype.hasOwnProperty.call(items, generatedId))
      return {
        error: {
          message: "Item already exists"
        }
      };
    items[generatedId] = payload
    const {
      acknowledged
    } = await _categoryCollection
    .updateOne(
      { _id : ObjectId(categoryId)},
      { $set: { items } }
    )
    if(acknowledged) return {
      categoryName: category.name,
      ...payload
    }
  }
  return {};
}

const update = async (payload) => {
  const { categoryId } = payload
  const category = await _categoryCollection
  .findOne({ _id : ObjectId(categoryId)})
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