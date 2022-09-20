/** ****************************************************************************************************************
 * Name                 :   unAuthRoute.test
 * Description          :   Test class for unauth routes
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Craeted Date         :   30/03/2022
 ***************************************************************************************************************** */

const { StatusCodes } = require("http-status-codes");
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const envConfig = require("../../conf/envConfig");
const app = require("../../app");

describe("Unauth routes", () => {
  const xApiKeyStr = "x-api-key";
  // Signup api
  const signupApiUrl = "/api/v1/guest/signup";
  describe(`POST ${signupApiUrl}`, () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        userSsn: "03068300893",
        password: "Password@123",
      };
    });
    test("should return 200 and successfuly register user if request data is ok", async () => {
      await request(app)
        .post(signupApiUrl)
        .set(xApiKeyStr, envConfig.mwAccessKey)
        .send(newUser)
        .expect(StatusCodes.OK);
    });
    test("should return 400 error if password is invalid", async () => {
      newUser.password = "passwo";
      await request(app)
        .post(signupApiUrl)
        .set(xApiKeyStr, envConfig.mwAccessKey)
        .send(newUser)
        .expect(StatusCodes.BAD_REQUEST);
    });
  });

  // Signin api
  const signinApiUrl = "/api/v1/guest/signin";
  describe(`POST ${signinApiUrl}`, () => {
    let loginCredentials;
    beforeEach(() => {
      loginCredentials = {
        userSsn: "03068300893",
      };
    });
    test("should return 200 and successfuly login user if request data is ok", async () => {
      await request(app)
        .post(signinApiUrl)
        .set(xApiKeyStr, envConfig.mwAccessKey)
        .send(loginCredentials)
        .expect(StatusCodes.OK);
    });
    test("should return 400 error if userSsn is invalid", async () => {
      loginCredentials.userSsn = "123456789";
      await request(app)
        .post(signinApiUrl)
        .set(xApiKeyStr, envConfig.mwAccessKey)
        .send(loginCredentials)
        .expect(StatusCodes.BAD_REQUEST);
    });
  });
});
