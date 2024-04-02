"use strict";

const Shop = require("../models/shop.model");
const brycpt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils");
const RoleShop = {
  SHOP: "0000",
  WRITER: "0001",
  EDITOR: "0002",
  ADMIN: "0003",
};
class AccessService {
  signUp = async ({ name, email, password }) => {
    try {
      //step 1: check if user exists
      const holdelShop = await Shop.findOne({ email }).lean();
      if (holdelShop) {
        return {
          code: "xxx",
          message: "Shop already exists",
          status: "error",
        };
      }
      const salt = await brycpt.genSalt(10);
      password = await brycpt.hash(password, salt);
      const newShop = await Shop.create({
        name,
        email,
        password,
        roles: [RoleShop.SHOP],
      });
      console.log("newShop-----------------------", newShop);

      if (newShop) {
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        console.log("privateKey--------------", privateKey);

        const keyStore = await KeyTokenService.createKeyToken({
          userID: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          return {
            code: "xxx",
            message: "Error creating publicKey",
            status: "error",
          };
        }

        const tokens = await createTokenPair(
          { id: newShop._id, email },
          privateKey,
          publicKey
        );
        console.log("tokens", tokens);

        return {
          code: "0000",
          metadata: {
            shop: getIntoData({
              fileds: ["_id", "name", "email", "status", "roles"],
              object: newShop,
            }),
            tokens,
          },
        };
      }
    } catch (error) {
      console.log("error", error);
      return {
        code: 200,
        metadata: null,
      };
    }
  };
}
module.exports = new AccessService();
