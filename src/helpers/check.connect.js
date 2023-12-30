"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;
//count connection
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections: ${numConnection}`);
};
//check over load
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnection = numCores * 5;
    console.log(`Overload connection: ${numConnection}`);
    console.log(`Number of cores: ${numCores}`);
    console.log(`Memory usage: ${memoryUsage/1024/1024} MB}`);
    console.log(`Max connection: ${maxConnection}`);
    // test
    if (numConnection > maxConnection) {
     
    }
  }, 1000);
};

module.exports = {
  countConnect,
  checkOverload,
};
