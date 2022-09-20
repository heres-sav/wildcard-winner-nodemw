const envConfig = require("./envConfig");

module.exports = {
  dbProfile: {
    username: envConfig.dbCreds.username,
    password: envConfig.dbCreds.password
  },
};
