const updateTable = require("../mongodb/crudOps/_tableOps");

const onSocketConnect = (socket) => {
  console.log("a user connected");
  socket.on("join", async (domain) => {
    try {
      let result = await collection.findOne({ "_id": domain });
      if(!result) {
        await collection.insertOne({ "_id": domain, tables: [] });
      }
      socket.join(domain);
      socket.emit("joined", domain);
      socket.activeRoom = domain;
    } catch (e) {
      console.error(e);
    }
  });
  // socket.on("table", (table) => {
  //   console.log(table);
  //   collection.updateOne({ "_id": socket.activeRoom }, {
  //     "$push": {
  //       "tables": table
  //     }
  //   });
  //   io.to(socket.activeRoom).emit("table", table);
  // });
  socket.on("table:update", updateTable);
}

module.exports = onSocketConnect;
