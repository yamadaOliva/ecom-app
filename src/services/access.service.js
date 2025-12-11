"use strict";

const Shop = require("../models/shop.model");
const brycpt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyToken } = require("../auth/authUtils");
const { getIntoData } = require("../utils");
const {
  BadRequestResponse,
  NotFoundResponse,
  ForbiddenResponse,
} = require("../core/error.response");

const { findShopByEmail } = require("./shop.service");

const RoleShop = {
  SHOP: "0000",
  WRITER: "0001",
  EDITOR: "0002",
  ADMIN: "0003",
};
class AccessService {
  handleRefreshToken = async (refreshToken) => {
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    );
    if (foundToken) {
      const { userId, email } = verifyToken(
        refreshToken,
        foundToken.privateKey
      );
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenResponse("Refresh token is used");
    }

    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) {
      throw new ForbiddenResponse("Refresh token is invalid");
    }

    const { userId, email } = verifyToken(refreshToken, holderToken.privateKey);

    const foundShop = await findShopByEmail({ email });
    if (!foundShop) {
      throw new NotFoundResponse("Shop not found");
    }

    const tokens = await createTokenPair(
      { userId, email },
      holderToken.privateKey,
      holderToken.publicKey
    );


    // await holderToken.update({
    //   $set: {
    //     refreshToken: tokens.refreshToken,
    //   },
    //   $addToSet: {
    //     refreshTokenUsed: refreshToken,
    //   },
    // });

    KeyTokenService.updateToken(
      holderToken.user,
      tokens.refreshToken,
      refreshToken
    );

    return {
      tokens,
    };
  };

  logOut = async (keyStore) => {
    const delKey = KeyTokenService.removeKeyTokenById(keyStore._id);
  };

  signIn = async ({ email, password, refreshToken = null }) => {
    const findShop = await findShopByEmail({ email });
    if (!findShop) {
      throw new NotFoundResponse("Email or password is incorrect");
    }

    const isMatch = await brycpt.compare(password, findShop.password);
    if (!isMatch) {
      throw new NotFoundResponse("Email or password is incorrect");
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { id: findShop._id, email },
      privateKey,
      publicKey
    );

    await KeyTokenService.createKeyToken({
      userID: findShop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getIntoData({
        fields: ["_id", "name", "email", "status", "roles"],
        object: findShop,
      }),
      tokens,
    };
  };

  signUp = async ({ name, email, password }) => {
    //step 1: check if user exists name or email
    const holdelShop = await Shop.findOne({
      $or: [{ name }, { email }],
    });

    if (holdelShop) {
      throw new BadRequestResponse("Email or name already exists");
    }
    const salt = await brycpt.genSalt(10);
    password = await brycpt.hash(password, salt);
    const newShop = await Shop.create({
      name,
      email,
      password,
      roles: [RoleShop.SHOP],
    });

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

      return {
        code: "0000",
        metadata: {
          shop: getIntoData({
            fields: ["_id", "name", "email", "status", "roles"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
  };
}
module.exports = new AccessService();
