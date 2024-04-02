"use strict";

const express = require("express");
const { apiKey } = require("../auth/checkAuth");
const routers = express.Router();
routers.use("/v1/api", require("./access"));

// check api key
route.use(apiKey);

module.exports = routers;
