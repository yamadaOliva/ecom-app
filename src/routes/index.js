"use strict";

const express = require("express");
const routers = express.Router();
routers.use('/v1/api', require('./access'));

module.exports = routers;
