const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

//init middlewares
app.use(morgan("dev"));
// morgan("combined")
// morgan("common")
// morgan("short")
// morgan("tiny")
app.use(helmet());
app.use(compression());
//init db
require("./dbs/init.mongodb");
const { checkOverload } = require("./helpers/check.connect");
checkOverload();
//init routers
app.get("/", (req, res) => {
  return res.status(200).json({});
});
//handle errors

module.exports = app;
