/** ****************************************************************************************************************
 * Name                 :   components
 * Description          :   It conatin the helper component for API documentation.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   30/03/2022
 ***************************************************************************************************************** */

module.exports = {
  components: {
    schemas: {
      Error: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          statusCode: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
      Success: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          statusCode: {
            type: "string",
          },
          message: {
            type: "string",
          },
          content: {
            type: "object",
          },
        },
      },
    },
    responses: {
      AccessDenied: {
        description:
          "Access Denied (If the x-api-key is not present in the API request header)",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "ERROR",
              statusCode: 401,
              message: "Access Denied",
            },
          },
        },
      },
      Unauthorized: {
        description:
          "Unauthorized(If the x-auth-token is not present in the API request header)",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "ERROR",
              statusCode: 401,
              message: "Unauthorized",
            },
          },
        },
      },
      NotFound: {
        description: "Not Found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "ERROR",
              statusCode: 404,
              message: "Not Found",
            },
          },
        },
      },
      BadRequest: {
        description: "Bad Request",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "ERROR",
              statusCode: 400,
              message: "SSN is required.",
            },
          },
        },
      },
      InternalServerError: {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "ERROR",
              statusCode: 500,
              message: "Something went wrong",
            },
          },
        },
      },
      BadGateway: {
        description: "Bad Gateway",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              status: "ERROR",
              statusCode: 502,
              message: "Bad Gateway",
            },
          },
        },
      },
    },
    definitions: {
      LoanList: {
        type: "object",
        properties: {
          status: {
            type: "string",
          },
          statusCode: {
            type: "string",
          },
          message: {
            type: "string",
          },
          content: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "APP-00001208",
                },
                loanName: {
                  type: "string",
                  example: "LAI-00001741",
                },
                requestedLoanAmount: {
                  type: "integer",
                  example: 20000,
                },
                loanTerm: {
                  type: "integer",
                  example: 12,
                },
                percentFunded: {
                  type: "integer",
                  example: 25,
                },
                loanPurpose: {
                  type: "string",
                  example: "Refinansiering",
                },
                interestRate: {
                  type: "integer",
                  example: 8,
                },
                additionalInformation: {
                  type: "string",
                  example: "Good To Go",
                },
                creditBandType: {
                  type: "string",
                  example: "D",
                },
              },
            },
          },
        },
      },
    },
  },
};
