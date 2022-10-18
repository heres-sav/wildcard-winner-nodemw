const app = require("./app");
const server = require("http").createServer(app);
const io = require("socket.io")(server,
  {
    path: '/flooke-socket',
    transports: ['polling'],
    secure: true
  }
);
// const onSocketConnect = require("./services/socket_io/index");
const envConfig = require("./conf/envConfig");
const { init } = require("./services/mongoDb/client");
const constantUtilService = require("./services/utils/constantUtilService");
const logger = require("./services/utils/loggerUtilService");
const {
  pushOrder, updateOrder, processOrder
} = require("./services/mongoDb/crudOps/_tableOps");

// START SERVER
server.listen(envConfig.port, async () => {
  try {
    await init()
    logger.info(`Server is running on port ${server.address().port}`);
  } catch (e) {
    logger.error(e);
  }
})

// SOCKET IO Connection
io.on("connection", (socket) => {
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
    io.to(socket.activeRoom).emit("order:status", result);
    console.log("order:status emmitted");
  });
  socket.on("order:update", async (payload) => {
    console.log("order:update called");
    const result = await updateOrder(payload)
    socket.emit("order:status", result);
    io.to(socket.activeRoom).emit("order:status", result);
    console.log("order:status emmitted");
  });
  socket.on("order:delete", async (payload) => {
    console.log("order:delete called");
    const result = await processOrder(payload)
    io.to(socket.activeRoom).emit("order:status", result);
    console.log("order:status emmitted");
  });
})

// Unexpected error handler
const unexpectedErrorHandler = (err) => {
  if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
    logger.error(`SERVER PROCESS ERROR : ${err}`);
  if (server) {
    server.close(() => {
      if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
        logger.info("SERVER CLOSED.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Process error event catach
// uncaught exception catch
process.on(constantUtilService.UNCAUGHT_EXEPTION_EVENT, unexpectedErrorHandler);
// unhandled rejection error catch
process.on(
  constantUtilService.UNHANDLED_REJECTION_EVENT,
  unexpectedErrorHandler
);
// sigterm process error catch
process.on(constantUtilService.SIGTERM_EVENT, unexpectedErrorHandler);