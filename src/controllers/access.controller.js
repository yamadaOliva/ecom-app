"use strict";

const AccessService = require("../services/access.service");
const { OK, Created } = require("../core/success.response");

class AccessController {
  logout = async (req, res, next) => {
    new OK({
      message: "Success",
      metadata: await AccessService.logOut(req.keyStore),
    }).send(res);
  };

  login = async (req, res, next) => {
    new OK({
      message: "Success",
      metadata: await AccessService.signIn(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new Created({
      message: "Success",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  refreshToken = async (req, res, next) => {
    new OK({
      message: "Success",
      metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
    }).send(res);
  };
}
module.exports = new AccessController();
