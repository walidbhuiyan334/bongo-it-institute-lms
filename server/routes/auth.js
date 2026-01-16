// server/routes/auth.js
const express = require("express");
const { register, login } = require("../controllers/auth"); // login ইম্পোর্ট করলাম

const router = express.Router();

router.post("/register", register);
router.post("/login", login); // নতুন রুট যোগ হলো

module.exports = router;