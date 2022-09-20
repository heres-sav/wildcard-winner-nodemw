/** ****************************************************************************************************************
 * Name                 :   docRoute
 * Description          :   It handle all the api docs related routes.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerConf = require("../../docs/api-v1");

// All ROUTES

// API doc route
router.use("/api-docs", swaggerUi.serve);
router.get(
  "/api-docs",
  swaggerUi.setup(swaggerConf.defination, swaggerConf.options)
);

module.exports = router;
