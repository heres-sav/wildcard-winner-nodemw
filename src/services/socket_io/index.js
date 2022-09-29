const updateTable = require("../mongodb/crudOps/_tableOps");

const onSocketConnect = (socket) => {
  socket.on("join", async (domain) => {
    try {
      socket.join(domain);
      socket.activeRoom = domain;
    } catch (e) {
      console.error(e);
    }
  })
  socket.on("order:add", async (domain) => {});
  socket.on("order:update", async (payload) => {
    io.to(socket.activeRoom).emit("order:update", payload);
  });
}

module.exports = onSocketConnect;
