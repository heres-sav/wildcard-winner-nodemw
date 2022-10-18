const { pushOrder, updateOrder, processOrder } = require("../mongodb/crudOps/_tableOps");

const onSocketConnect = (socket) => {
  console.log("a user connected");
  socket.on("join", async (domain) => {
    try {
      socket.join(domain);
      socket.emit("joined", domain);
      console.log(domain);
    } catch (e) {
      console.error(e);
    }
  })
  socket.on("order:add", async (payload) => {
    const result = await pushOrder(payload)
    socket.emit("order:status", result);
  });
  socket.on("order:update", async (payload) => {
    const result = await updateOrder(payload)
    socket.emit("order:status", result);
  });
  socket.on("order:delete", async (payload) => {
    const result = await processOrder(payload)
    socket.emit("order:status", result);
  });
}

module.exports = onSocketConnect;
