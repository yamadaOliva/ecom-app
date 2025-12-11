"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const routers = express.Router();

// check api key
routers.use(apiKey);
// check permission
routers.use(permission("0000"));

routers.use("/v1/api", require("./access"));
routers.use("/v1/api/product", require("./product"));

module.exports = routers;
