const _itemOutlineValidator = {
  $jsonSchema: {
    bsonType: "object",
    title: "Item outline object validation",
    required: [
      "name",
      "sellingCost",
      "inStock",
      "type"
    ],
    properties: {
      name: {
        bsonType: "string",
        description: "item name must be a string and is required"
      },
      description: {
        bsonType: "string",
        description: "item description must be a string and is optional"
      },
      processingCost: {
        bsonType: "number",
        description: "processing cost needs to be a number and is optional"
      },
      sellingCost: {
        bsonType: "number",
        description: "selling cost needs to be a number and is required"
      },
      inStock: {
        bsonType: "bool",
        description: "'gpa' must be a double if the field exists"
      },
      type: {
        enum: [ "veg", "non-veg", "beverage", "dessert" ],
        description: "type value must be any one from the specified values from picker"
      }
    }
  }
}

module.exports = _itemOutlineValidator
