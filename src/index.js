const app = require("./app");
const server = require("http").createServer(app);
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