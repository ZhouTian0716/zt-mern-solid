const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // Check your frontend req header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const accessToken = authHeader.split(" ")[1];
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // return message for front end to know it is expired 
      return res.status(403).json(err);
    } 
    // check this decoded when you define it at auth controller
    // Note: this req will be sent to next handler, we can modify req here
    req.account = decoded;
    // console.log(req.account)
    // account: {
    //     email: 'user4@example.com',
    //     id: '636b310b1c3e1602e7e22b12',
    //     iat: 1668735575,
    //     exp: 1668735695
    //  }
    next();
  });
};

module.exports = verifyJWT;
