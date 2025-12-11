"use strict";

const keyTokenModel = require("../models/keyToken.model");
const { Types } = require("mongoose");

class KeyTokenService {
  static createKeyToken = async ({
    userID,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // const publicKeyString = publicKey.toString();
      //level 0
      // const token = await keyTokenModel.create({
      //   user: userID,
      //   publicKey: publicKey,
      //   privateKey: privateKey,
      // });

      const filter = { user: userID },
        update = {
          publicKey,
          privateKey,
          refreshTokenUsed: [],
          refreshToken,
        },
        options = { new: true, upsert: true };

      const token = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return token ? token.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userID) => {
    return await keyTokenModel
      .findOne({
        user: new Types.ObjectId(userID),
      })
      .lean();
  };

  static removeKeyTokenById = async (id) => {
    return await keyTokenModel.findByIdAndDelete(id).lean();
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel
      .findOne({ refreshTokenUsed: refreshToken })
      .lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken });
  };

  static updateToken = async (userId, refreshToken, refreshTokenUsed) => {
    return await keyTokenModel.findOneAndUpdate(
      { user: userId },
      {
        refreshToken,
        $addToSet: { refreshTokenUsed },
      },
      { new: true }
    );
  };

  static deleteKeyById = async (userId) => {
    return await keyTokenModel.findByIdAndDelete({ user: userId });
  };
}

module.exports = KeyTokenService;
