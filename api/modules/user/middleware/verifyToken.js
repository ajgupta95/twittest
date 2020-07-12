"use strict";
const jwt = require('jsonwebtoken');


class VerifyToken {
  verifyToken(req, res, next) {
    let token = req.headers["token"];
    if (!token)
      return res
        .status(200)
        .send({ auth: false, message: "No token provided." });
    jwt.verify(token, 'shhhhh', function (error, decoded) {
      if (error) {
        console.log("------------>Token ERROR", error);
        
      } else {
        req.data = {
          id: decoded.id,
          token: token,
        };
        console.log("------------------>>token verified");
        next();
      }
    });
  }
}
module.exports = new VerifyToken();
