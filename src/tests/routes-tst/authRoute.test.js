/** ****************************************************************************************************************
 * Name                 :   authRoute.test
 * Description          :   Test class for auth routes
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Craeted Date         :   30/03/2022
 ***************************************************************************************************************** */

const { StatusCodes } = require("http-status-codes");
const request = require("supertest");
const envConfig = require("../../conf/envConfig");
const app = require("../../app");

describe("Auth routes", () => {
  // Investor loan list api coverage
  const invLoanListApiUrl = "/api/v1/user/investor/loanlist";
  const xApiKeyStr = "x-api-key";
  describe(`GET ${invLoanListApiUrl}`, () => {
    test("should return 401 if the auth token is not present in request header", async () => {
      await request(app)
        .get(invLoanListApiUrl)
        .set(xApiKeyStr, envConfig.mwAccessKey)
        .send()
        .expect(StatusCodes.UNAUTHORIZED);
    });
  });
});
