// const app = require("./app");
const envConfig = require("./conf/envConfig");
// const constantUtilService = require("./services/utils/constantUtilService");
// const logger = require("./services/utils/loggerUtilService");

// // START SERVER
// const server = app.listen(envConfig.port, () => {
//   logger.info(`Server is running on port ${envConfig.port}`);
// });

// // Unexpected error handler
// const unexpectedErrorHandler = (err) => {
//   if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
//     logger.error(`SERVER PROCESS ERROR : ${err}`);
//   if (server) {
//     server.close(() => {
//       if (envConfig.nodeEnv !== constantUtilService.TEST_ENV)
//         logger.info("SERVER CLOSED.");
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// };

// // Process error event catach
// // uncaught exception catch
// process.on(constantUtilService.UNCAUGHT_EXEPTION_EVENT, unexpectedErrorHandler);
// // unhandled rejection error catch
// process.on(
//   constantUtilService.UNHANDLED_REJECTION_EVENT,
//   unexpectedErrorHandler
// );
// // sigterm process error catch
// process.on(constantUtilService.SIGTERM_EVENT, unexpectedErrorHandler);

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { MongoClient } = require("mongodb");
var collection;
const client = new MongoClient(envConfig.atlasUri);

app.get("/chats", async (request, response) => {
  try {
    let result = await collection.findOne({ "_id": request.query.room });
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("join", async (gameId) => {
    try {
      let result = await collection.findOne({ "_id": gameId });
      if(!result) {
        await collection.insertOne({ "_id": gameId, messages: [] });
      }
      socket.join(gameId);
      socket.emit("joined", gameId);
      socket.activeRoom = gameId;
    } catch (e) {
      console.error(e);
    }
  });
  socket.on("message", (message) => {
    collection.updateOne({ "_id": socket.activeRoom }, {
      "$push": {
        "messages": message
      }
    });
    io.to(socket.activeRoom).emit("message", message);
  });
})
// START SERVER
server.listen(envConfig.port, async () => {
  try {
    await client.connect();
    collection = client.db("gamedev").collection("chats");
    console.log("Listening on port :%s...", server.address().port);
  } catch (e) {
    console.error(e);
  }
})