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
        // items: {
        //   bsonType: "object",
        //   description: "category items need to be an array and is optional",
        //   required: [
        //     "name",
        //     "inStock",
        //     "sellingCost",
        //     "type"
        //   ],
        //   properties: {
        //     name: {
        //       bsonType: "string",
        //       description: "item name must be a string and is required"
        //     },
        //     inStock: {
        //       bsonType: "bool",
        //       description: "item in stock must be boolean and is required"
        //     },
        //     processingCost: {
        //       bsonType: "number",
        //       description: "item processing cost must be number"
        //     },
        //     sellingCost: {
        //       bsonType: "number",
        //       description: "item selling cost must be number and is required"
        //     },
        //     type: {
        //       bsonType: "string",
        //       description: "item type must be a string and is required"
        //     }
        //   }
        // }
      }
    }
  }
}

module.exports = _category_v
