/** ****************************************************************************************************************
 * Name                 :   authApiDoc
 * Description          :   It containe all the auth API details.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   30/03/2022
 ***************************************************************************************************************** */

module.exports = {
  "/user/investor/loanlist": {
    get: {
      summary: "Investor marketplace loan list",
      tags: ["Dashboard"],
      operationId: "invLoanList",
      consumes: ["application/json"],
      produces: ["application/json"],
      parameters: [
        {
          name: "x-api-key",
          in: "header",
          description: "Api key to access the API end point.",
          required: true,
          type: "string",
        },
        {
          name: "x-auth-token",
          in: "header",
          description: "Auth token to access private apis.",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Successful operation",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/definitions/LoanList",
              },
            },
          },
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        401: {
          $ref: "#/components/responses/AccessDenied",
        },
        500: {
          $ref: "#/components/responses/InternalServerError",
        },
        502: {
          $ref: "#/components/responses/BadGateway",
        },
      },
    },
  },
};
