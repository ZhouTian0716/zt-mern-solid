const AccountCollection = require("../models/account.js");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  // Learning question here, how do you send cookie from front end?
  
  const cookies = req.cookies;

  if (!cookies?.jwt_refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.jwt_refreshToken;

  const foundAccount = await AccountCollection.findOne({ refreshToken }).exec();
  if (!foundAccount) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundAccount.email !== decoded.email) return res.sendStatus(403);
    // Role based in the future
    // const roles = Object.values(foundAccount.roles);
    let accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(
      {
        email: decoded.email,
        id: decoded.id,
      },
      accessSecret,
      { expiresIn: '30s' }
    );
    res
      .status(200)
      .json({ accessToken_refreshed: accessToken, refreshed_account: decoded });
  });
};

module.exports = { handleRefreshToken };
