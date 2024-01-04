"use strict";
const mongoose = require("mongoose");
const  { db: {host,port,name,user,pass} } = require("../configs/config.mongo");
// const connectString = "mongodb://root:panda@localhost:27017";
console.log(process.env.DB_PASS);
const connectString = `mongodb://${user}:${pass}@${host}:${port}`;
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
      .connect(connectString,{
        maxPoolSize: 50,
      })
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
