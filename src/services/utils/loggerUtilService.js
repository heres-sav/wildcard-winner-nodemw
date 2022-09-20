/** ****************************************************************************************************************
 * Name                 :   loggerUtilService
 * Description          :   Custom logger setup using winston package.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/03/2022
 ***************************************************************************************************************** */

const winston = require("winston");
const envConfig = require("../../conf/envConfig");
const constantUtilService = require("./constantUtilService");

// Enamurate info error format.
const enumerateInfoErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Custom logger setting.
const loggerConfig = {
  lavel:
    envConfig.nodeEnv === constantUtilService.DEV_ENV ||
    envConfig.nodeEnv === constantUtilService.LOCAL_ENV
      ? constantUtilService.DEBUG
      : constantUtilService.INFO,
  format: winston.format.combine(
    enumerateInfoErrorFormat(),
    envConfig.nodeEnv === constantUtilService.DEV_ENV ||
      envConfig.nodeEnv === constantUtilService.LOCAL_ENV
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `[${level}] : ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: [constantUtilService.ERROR],
    }),
  ],
};
const logger = winston.createLogger(loggerConfig);

module.exports = logger;
