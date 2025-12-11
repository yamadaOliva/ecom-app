const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
// const bodyParser = require("body-parser");
//init middlewares
app.use(morgan("dev"));
// morgan("combined")
// morgan("common")
// morgan("short")
// morgan("tiny")
app.use(helmet()); // bao mat
app.use(compression()); // giam kich thuoc file tra ve
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.json());
//init db
require("./dbs/init.mongodb");
const { checkOverload } = require("./helpers/check.connect");
checkOverload();
//init routers
app.use("", require("./routes/index"));
//handle errors

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("err", err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message,
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
