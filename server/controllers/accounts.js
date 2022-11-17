const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const AccountCollection = require("../models/account.js");

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
  const secret = process.env.JWT_SECRET;
  try {
    const existingAccount = await AccountCollection.findOne({ email });
    if (!existingAccount)
      return res.status(404).json({ message: "Account not found" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAccount.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      {
        email: existingAccount.email,
        id: existingAccount._id,
      },
      secret,
      { expiresIn: "1h" }
    );
    res.status(200).json({ account: existingAccount, token });
  } catch (error) {
    res.status(500).json({ message: "Sign In Failed", error: error });
  }
};

const signUp = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  const secret = process.env.JWT_SECRET;
  try {
    const existingAccount = await AccountCollection.findOne({ email });
    if (existingAccount)
      return res
        .status(400)
        .json({ message: "Email existed already in system" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await AccountCollection.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ account: result, token });
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
