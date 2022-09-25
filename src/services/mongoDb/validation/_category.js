const _category_v = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Category object validation",
      required: [
        "name"
      ],
      properties: {
        name: {
          bsonType: "string",
          description: "category name must be a string and is required"
        },
        description: {
          bsonType: "string",
          description: "category description must be a string and is optional"
        },
        items: {
          bsonType: "array",
          description: "category items need to be an array and is optional"
        }
      }
    }
  }
}

module.exports = _category_v
