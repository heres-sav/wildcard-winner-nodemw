const { pushOrder, updateOrder, processOrder } = require("../mongoDb/crudOps/_tableOps");

const onSocketConnect = (socket) => {
  console.log("a user connected");
  socket.on("join", async (domain) => {
    try {
      socket.join(domain);
      socket.emit("joined", domain);
      // eslint-disable-next-line no-param-reassign
      socket.activeRoom = domain;
    } catch (e) {
      console.error(e);
    }
  })
  socket.on("order:add", async (payload) => {
    console.log("order:add called");
    const result = await pushOrder(payload)
    socket.emit("order:status", result);
    console.log("order:status emmitted");
  });
  socket.on("order:update", async (payload) => {
    console.log("order:update called");
    const result = await updateOrder(payload)
    socket.emit("order:status", result);
    console.log("order:status emmitted");
  });
  socket.on("order:delete", async (payload) => {
    console.log("order:delete called");
    const result = await processOrder(payload)
    socket.emit("order:status", result);
    console.log("order:status emmitted");
  });
}

module.exports = onSocketConnect;
