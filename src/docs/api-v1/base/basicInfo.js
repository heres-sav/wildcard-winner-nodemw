/** ****************************************************************************************************************
 * Name                 :   basicInfo
 * Description          :   It conatin the basic information about the api documentation.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   30/03/2022
 ***************************************************************************************************************** */

const { version } = require("../../../../package.json");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "[Project Name] APIs",
    description: "[Project Name] APIs documentation",
    version,
    license: {
      name: "MIT",
      url: "https://choosealicense.com/licenses/mit/",
    },
  },
  schema: ["http", "https"],
};
