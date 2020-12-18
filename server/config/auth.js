import jwt from "express-jwt";
import blacklist from "express-jwt-blacklist";
import appConfig from "./env";

const getTokenFromHeader = req => {
  console.log(req);
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
console.log('getTokenFromHeader', getTokenFromHeader)
blacklist.debug = true;
blacklist.configure({
  tokenId: "jti"
  // strict: true,
  // store: {
  //     type: 'memcached',
  //     host: 'localhost',
  //     port: 3001,
  //     keyPrefix: 'mywebapp:',
  //     options: {
  //         timeout: 1000
  //     }
  // }
});

const authRequired = jwt({
  secret: appConfig.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "user",
  credentialsRequired: false,
  isRevoked: blacklist.isRevoked,
  getToken: getTokenFromHeader
});

console.log("authRequired", authRequired);
const authOptional = jwt({
  secret: appConfig.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "user",
  credentialsRequired: false,
  getToken: getTokenFromHeader
});

export { authRequired, authOptional };
