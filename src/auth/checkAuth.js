"use strict";

const { findById } = require("../services/apikey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) return res.status(403).json({ message: "Forbidden" });

    //check obj key
    const objKey = findById(key);
    if (!objKey) return res.status(403).json({ message: "Forbidden" });

    req.objKey = objKey;
    return next();
  } catch (error) {}
};
module.exports = { apiKey };
