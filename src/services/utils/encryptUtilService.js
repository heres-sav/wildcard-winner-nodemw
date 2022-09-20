/** ****************************************************************************************************************
 * Name                 :   excryptUtilService
 * Description          :   It handle all the data encryption and decryption methods.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   17/03/2022
 ***************************************************************************************************************** */

const bcrypt = require("bcrypt");
const constantUtilService = require("./constantUtilService");

// Encrypt a data.
// For example password.
const encryptData = (dataToBeEncrypt) => {
  if (dataToBeEncrypt) {
    return bcrypt.hash(dataToBeEncrypt, constantUtilService.SALT_ROUNDS);
  }
  return null;
};

// Comapre a encrypted data with a request data.
// For example - encrypted password save in BE will be compared with api request password
const isEncryptedDataMatch = (requestData, encryptedData) => {
  if (requestData && encryptedData) {
    return bcrypt.compare(requestData, encryptedData);
  }
  return false;
};

module.exports = {
  encryptData,
  isEncryptedDataMatch,
};
