/** ****************************************************************************************************************
 * Name                 :   unAuthApiDoc
 * Description          :   It containe all the guest user API details.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Modification Date    :   30/03/2022
 ***************************************************************************************************************** */

module.exports = {
  "/guest/signup": {
    post: {
      summary: "Signup as user",
      tags: ["Guest"],
      operationId: "signup",
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
      ],
      requestBody: {
        description: "User signup credentials",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["userSsn", "password"],
              properties: {
                name: {
                  type: "string",
                  example: "Your Name",
                },
                userSsn: {
                  type: "string",
                  example: "03068300891",
                },
                password: {
                  type: "string",
                  example: "Qwer@1234",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successful operation",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "SUCCESS",
                  },
                  statusCode: {
                    type: "integer",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "",
                  },
                  content: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        example: "Your Name",
                      },
                      userSsn: {
                        type: "string",
                        example: "03068300891",
                      },
                    },
                  },
                },
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
  "/guest/signin": {
    post: {
      summary: "Signin as user",
      tags: ["Guest"],
      operationId: "signin",
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
      ],
      requestBody: {
        description: "User signin credentials",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["userSsn"],
              properties: {
                userSsn: {
                  type: "string",
                  example: "03068300891",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successful operation",
          headers: {
            "x-auth-token": {
              type: "string",
              description: "Auth token to call private APIs.",
              example: "asdasdasda",
            },
          },
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "SUCCESS",
                  },
                  statusCode: {
                    type: "integer",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "",
                  },
                  content: {
                    type: "object",
                    properties: {
                      userSsn: {
                        type: "string",
                        example: "03068300891",
                      },
                    },
                  },
                },
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
