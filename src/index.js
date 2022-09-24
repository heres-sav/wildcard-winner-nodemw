const app = require("./app");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const envConfig = require("./conf/envConfig");
const { client, OrderManagementDB } = require("./services/mongoDb/client");
const constantUtilService = require("./services/utils/constantUtilService");
const logger = require("./services/utils/loggerUtilService");

const collection = OrderManagementDB.collection("_activeOrders");

// START SERVER
server.listen(envConfig.port, async () => {
  try {
    await client.connect();
    logger.info(`Server is running on port ${server.address().port}`);
  } catch (e) {
    logger.error(e);
  }
})

// Realtime connection using socket.io
io.on("connection", (socket) => {
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
  socket.on("table", (table) => {
    console.log(table);
    collection.updateOne({ "_id": socket.activeRoom }, {
      "$push": {
        "tables": table
      }
    });
    io.to(socket.activeRoom).emit("table", table);
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
