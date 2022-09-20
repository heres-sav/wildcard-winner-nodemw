/** ****************************************************************************************************************
 * Name                 :   index
 * Description          :   It wrappe the all API document related information.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   30/03/2022
 ***************************************************************************************************************** */

const basicInfo = require("./base/basicInfo");
const server = require("./base/server");
const components = require("./base/components");
const tags = require("./base/tags");
const apiDocs = require("./apis");

module.exports = {
  defination: {
    ...basicInfo,
    ...server,
    ...components,
    ...tags,
    ...apiDocs,
  },
  options: {
    customCss: ".swagger-ui .topbar { display: none }", // You can also set the path of your css file.
    customSiteTitle: "Your site tab title", // Title of your site.
    customfavIcon: "", // Link of your site favicon.
  },
};
