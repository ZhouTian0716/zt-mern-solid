const AccountCollection = require("../models/account.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const getAllAccounts = async (req, res) => {
  try {
    const allAccounts = await AccountCollection.find();
    res.status(200).json(allAccounts);
  } catch (error) {
    res.status(404).json({ ServerReportError: error.message });
  }
};

const deleteAccount = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Account with id: ${id}`);
  try {
    const result = await AccountCollection.findByIdAndRemove(id);
    res.status(201).json({ status: "delete success", item_id: result._id });
  } catch (error) {
    res.status(409).json({ ServerReportError: error.message });
  }
};

const deleteAll = async (req, res) => {
  try {
    await AccountCollection.deleteMany({});
    res.status(200).json({ message: "All Accounts Cleared" });
  } catch (error) {
    res.status(409).json({ ServerReportError: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  let accessSecret = process.env.ACCESS_TOKEN_SECRET;
  let refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  try {
    const foundAccount = await AccountCollection.findOne({ email });

    if (!foundAccount)
      return res.status(404).json({ message: "Account not found" });
    const match = await bcrypt.compare(password, foundAccount.password);
    if (match) {
      // JWT Backend From Here!
      
      const accessToken = jwt.sign(
        {
          email: foundAccount.email,
          id: foundAccount._id,
        },
        accessSecret,
        { expiresIn: "10s" } // units in 's' 'm' 'h' 'd'
      );
      const refreshToken = jwt.sign(
        {
          email: foundAccount.email,
          id: foundAccount._id,
        },
        refreshSecret,
        { expiresIn: "5h" } // units in 's' 'm' 'h' 'd'
      );
    
      // Saving refreshToken with current user
      foundAccount.refreshToken = refreshToken;
      const result = await foundAccount.save();
      // console.log(result);

      // Creates Secure Cookie with refresh token
      // ZT Note: keep the cookie options here if use cookie in the future!
      res.cookie("jwt_refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 5 * 60 * 60 * 1000,
      });

      // Send authorization account and access token to user
      res.status(200).json({ login_account: foundAccount, accessToken });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Sign In Failed", error: error });
  }
};

const signUp = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  // const secret = process.env.JWT_SECRET;
  try {
    const foundAccount = await AccountCollection.findOne({ email });
    if (foundAccount)
      return res
        .status(409)
        .json({ message: "Email existed already in system" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await AccountCollection.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    // const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    //   expiresIn: "1h",
    // });
    res.status(200).json({ new_account: result });
  } catch (error) {
    res.status(500).json({ message: "Sign Up Failed" });
    console.log(error);
  }
};

module.exports = {
  getAllAccounts,
  deleteAccount,
  deleteAll,
  signIn,
  signUp,
};
