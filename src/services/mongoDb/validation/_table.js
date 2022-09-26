const _table_v = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Table object validation",
      required: [
        "occupied",
        "orders"
      ],
      properties: {
        occupied: {
          bsonType: "bool"
        },
        orders: {
          bsonType: "object",
          // properties: {
          //   timestamp: {
          //     bsonType: "string"
          //   },
          //   items: {
          //     bsonType: "array",
          //     properties: {
          //       name: {
          //         bsonType: "string"
          //       },
          //       categoryName: {
          //         bsonType: "string"
          //       },
          //       processingCost: {
          //         bsonType: "number"
          //       },
          //       sellingCost: {
          //         bsonType: "number"
          //       },
          //       cooked: {
          //         bsonType: "bool"
          //       },
          //       served: {
          //         bsonType: "bool"
          //       },
          //       count: {
          //         bsonType: "int"
          //       },
          //       price: {
          //         bsonType: "number"
          //       },
          //       time: {
          //         bsonType: "string"
          //       },
          //       comment: {
          //         bsonType: "string"
          //       }
          //     }
          //   }
          // }
        }
      }
    }
  }
}

module.exports = _table_v
