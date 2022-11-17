const express = require('express');
const {
  getAllAccounts,
  signIn,
  signUp,
  deleteAccount,
  deleteAll,
} = require("../controllers/accounts.js") ;

// 👻 Starting by calling with express
const router = express.Router();

// 👻 Define your routes and methods (from controller folder)
router.get("/", getAllAccounts);
router.delete("/:id", deleteAccount);
router.delete("/", deleteAll);

router.post("/signin", signIn);
router.post("/signup", signUp);

module.exports = router;
