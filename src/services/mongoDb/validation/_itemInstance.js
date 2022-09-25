const _itemInstance_v = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Item instance object validation",
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
        categoryName: {
          bsonType: "string",
          description: "category name is required in order to create an item instance"
        },
        processingCost: {
          bsonType: "number",
          description: "processing cost needs to be a number and is optional"
        },
        cooked: {
          bsonType: "bool"
        },
        served: {
          bsonType: "bool"
        },
        count: {
          bsonType: "int"
        },
        price: {
          bsonType: "number"
        },
        time: {
          bsonType: "timestamp"
        }
      }
    }
  }
}

module.exports = _itemInstance_v
