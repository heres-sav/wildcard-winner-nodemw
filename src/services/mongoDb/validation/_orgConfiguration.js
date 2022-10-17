const _orgConfiguration_v = {
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
          bsonType: "object"
        }
      }
    }
  }
}

module.exports = _orgConfiguration_v
