const app = require("./app");
const envConfig = require("./conf/envConfig");
const constantUtilService = require("./services/utils/constantUtilService");
const logger = require("./services/utils/loggerUtilService");

// START SERVER
const server = app.listen(envConfig.port, () => {
  logger.info(`Server is running on port ${envConfig.port}`);
});

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
