"use strict";
const mongoose = require("mongoose");
const connectString = "mongodb://localhost:27017/express-mongoose";
mongoose
  .connect(connectString)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Error connecting to db", err);
  });
if (1 === 0) {
  mongoose.set("debug", true);
  mongoose.set('debug',{color:true});
}
module.exports = mongoose;
