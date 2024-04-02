const JWT = require("jsonwebtoken");
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
      } else {
        console.log("decoded", decoded);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {}
};
module.exports = {
  createTokenPair,
};
