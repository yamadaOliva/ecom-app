"use strict";

const shopModel = require("../models/shop.model");
const brycpt = require("bcryptjs");
const crypto = require("crypto");
const RoleShop = {
  SHOP: "0000",
  WRITER: "0001",
  EDITOR: "0002",
  ADMIN: "0003",
};
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      //step 1: check if user exists

      const holdelShop = await shopModel.findOne({ email }).lean();
      if (holdelShop) {
        return {
          code: "xxx",
          message: "Shop already exists",
          status: "error",
        };
      }
      const salt = await brycpt.genSalt(10);
      password = await brycpt.hash(password, salt);
      const newShop = new shopModel({
        name,
        email,
        password,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
        console.log("privateKey", privateKey, "publicKey", publicKey);
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}
module.exports = new AccessService();
