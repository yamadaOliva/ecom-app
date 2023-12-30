"use strict";
const mongoose = require("mongoose");
const connectString = "mongodb://root:panda@localhost:27017";
const { countConnect } = require("../helpers/check.connect");
class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("Connected to db PRO",countConnect());
      })
      .catch((err) => {
        console.log("Error connecting to db", err);
      });
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
module.exports = Database.getInstance();
