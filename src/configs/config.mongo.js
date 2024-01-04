require("dotenv").config();
("use strict");
const dev = {
  app: {
    port: process.env.PORT || 3055,
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || "express-mongoose",
    user: process.env.DB_USER || "root",
    pass: process.env.DB_PASS || "",
  },
};
const test = {
  app: {
    port: process.env.PORT || 3055,
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || "express-mongoose",
    user: process.env.DB_USER || "root",
    pass: process.env.DB_PASS || "",
  },
};
const pro = {
  app: {
    port: process.env.PORT || 3055,
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || "express-mongoose",
    user: process.env.DB_USER || "root",
    pass: process.env.DB_PASS || "",
  },
};
const config = {
  dev,
  test,
  pro,
};
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
