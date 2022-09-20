/** ****************************************************************************************************************
 * Name                 :   docRoute.test
 * Description          :   Test class for api docment related routes
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Craeted Date         :   30/03/2022
 ***************************************************************************************************************** */

const { StatusCodes } = require("http-status-codes");
const request = require("supertest");
const envConfig = require("../../conf/envConfig");
const app = require("../../app");

describe("Doc routes", () => {
  // Investor loan list api coverage
  const apiDocsApiUrl = "/docs/v1/api-docs";
  describe(`GET ${apiDocsApiUrl}`, () => {
    test("should return 404 when running in production", async () => {
      envConfig.nodeEnv = "production";
      await request(app)
        .get(apiDocsApiUrl)
        .send()
        .expect(StatusCodes.NOT_FOUND);
      envConfig.nodeEnv = process.env.NODE_ENV;
    });
  });
});
