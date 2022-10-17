const { ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid');
const { OrderManagementDB } = require("../client");

const _categoryCollection = OrderManagementDB.collection("_category");

// Priority 1 to fix the following operation first
const create = async (payload) => {
  const response = {}
  const {
    categoryName,
    name: itemName
  } = payload
  const category = await _categoryCollection
  .findOne({ name: categoryName})
  if(!category)
    return {};
  const { items } = category
  const generatedId = uuidv4()

  // Duplicate item check
  Object.keys(items).forEach(itemId => {
    if(items[itemId].name === itemName) {
      response.error = {
        message: "Item with same name already exists"
      }
    }
  })
  if(Object.prototype.hasOwnProperty.call(items, generatedId))
    response.error = {
      message: "Item already exists"
    }
  if(response.error) return response

  // no error flow
  items[generatedId] = payload
  const {
    acknowledged
  } = await _categoryCollection
  .updateOne(
    { _id : ObjectId(category._id)},
    { $set: { items } }
  )
  if(acknowledged) return {
    categoryName: category.name,
    ...payload
  }

  // database error
  return {
    error: {
      message: "database error"
    }
  };
}

const update = async (payload) => {
  const { _id, categoryId } = payload
  const category = await _categoryCollection
  .findOne({ _id : ObjectId(categoryId)})
  if(!category)
    return {};
  const { items } = category
  items[_id] = payload;
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
  
  // database error
  return {
    error: {
      message: "database error"
    }
  };
}

module.exports = {
  create,
  update
}