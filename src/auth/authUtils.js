const JWT = require("jsonwebtoken");
const { asyncHandler } = require("./checkAuth");
const {
  UnauthorizedResponse,
  NotFoundResponse,
} = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "refresh-token",
};

const createTokenPair = async (payload, privateKey, publicKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "30 days",
    });
    JWT.verify(accessToken, publicKey, (err, decoded) => {
      if (err) {
        throw new Error("Access Token is invalid");
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {}
};
const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  console.log("userId123", userId);
  if (!userId) throw new UnauthorizedResponse("Unauthorized");
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundResponse("Not Found");

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new UnauthorizedResponse("Unauthorized");

  if (req.headers[HEADER.REFRESH_TOKEN]) {
    const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
    if (!refreshToken) throw new UnauthorizedResponse("Unauthorized");
    const decoded = JWT.verify(refreshToken, keyStore.privateKey);
    if (!decoded) throw new UnauthorizedResponse("Unauthorized");
    JWT.verify(accessToken, keyStore.publicKey, (err, decoded) => {
      if (err) {
        throw new UnauthorizedResponse("Unauthorized");
      } else {
        req.keyStore = keyStore;
        return next();
      }
    });
  }
  console.log("keyStore", keyStore);

  JWT.verify(accessToken, keyStore.publicKey, (err, decoded) => {
    if (err) {
      console.log("err", err);
      throw new UnauthorizedResponse("Unauthorized");
    } else {
      if (decoded.id !== req.headers[HEADER.CLIENT_ID]) {
        throw new UnauthorizedResponse("Unauthorized");
      }
      req.keyStore = keyStore;
      req.user = decoded;
      return next();
    }
  });
});

const verifyToken = (token, secretKey) => {
  try {
    const decoded = JWT.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createTokenPair,
  authentication,
  verifyToken,
};
