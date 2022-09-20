/** ****************************************************************************************************************
 * Name                 :   server
 * Description          :   It conatin the server details of the API documentation.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   30/03/2022
 ***************************************************************************************************************** */

const envConfig = require("../../../conf/envConfig");

module.exports = {
  servers: [
    {
      url: `http://localhost:${envConfig.port}/api/v1`,
      description: "Local Server",
    },
    {
      url: `${envConfig.mwServerDomain}/api/v1`,
      description: "Dev Server",
    },
  ],
};
