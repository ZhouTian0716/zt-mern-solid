const AccountCollection = require("../models/account.js");

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt_refreshToken) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt_refreshToken;

    // Is refreshToken in db?
    const foundAccount = await AccountCollection.findOne({ refreshToken }).exec();
    if (!foundAccount) {
        // Dont touch the cookie options here, need to match options at create time
        res.clearCookie('jwt_refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundAccount.refreshToken = '';
    const result = await foundAccount.save();
    console.log('****************************************************');
    console.log(result);

    res.clearCookie('jwt_refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }