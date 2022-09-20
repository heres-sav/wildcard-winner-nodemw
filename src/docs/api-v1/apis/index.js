/** ****************************************************************************************************************
 * Name                 :   index
 * Description          :   It wrappe all the api paths details.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   30/03/2022
 ***************************************************************************************************************** */

const unAuthApiDoc = require("./unAuthApiDoc");
const authApiDoc = require("./authApiDoc");

module.exports = {
  paths: {
    ...unAuthApiDoc,
    ...authApiDoc,
  },
};
