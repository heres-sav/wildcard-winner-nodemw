/** ****************************************************************************************************************
 * Name                 :   authTokenService
 * Description          :   It handles the JTW token related features.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   14/02/2022
 ***************************************************************************************************************** */
const jwt = require("jsonwebtoken");
const envConfig = require("../../../conf/envConfig");

// GENERATE JWT TOKEN
const genAuthToken = (authUser) => {
  try {
    // Access token create and send.
    if (!authUser) return null;
    return jwt.sign(authUser, envConfig.jwt.tokenSecret, {
      expiresIn: envConfig.jwt.expireTime,
    });
  } catch (exp) {
    return null;
  }
};

// VERIFY JWT TOKEN.
const verifyAuthToken = async (authToken) => {
  try {
    if (!authToken) return false;
    return jwt.verify(authToken, envConfig.jwt.tokenSecret);
  } catch (exp) {
    return false;
  }
};

module.exports = {
  genAuthToken,
  verifyAuthToken,
};
