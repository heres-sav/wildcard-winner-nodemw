const _processedOrder_v = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Processed order object validation",
      required: [
        "summary",
        "items"
      ],
      properties: {
        summary: {
          bsonType: "object",
        },
        items: {
          bsonType: "object",
        }
      }
    }
  }
}

module.exports = _processedOrder_v
