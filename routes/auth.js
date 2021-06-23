const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const genAuthToken = require("../utils/genAuthToken");

// * authentication router
const router = express.Router();

// * we could also do "/register" and "/login" both here
router.post("/", async (req, res) => {
  try {
    // * 1. destruct the req.body
    const { email, password } = req.body;

    // * 2. check if user exists (if not throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0)
      return res.status(400).send("Invalid email or password.");

    // * 3. compare the given password with password stored in the database
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    // * 4. generate the jwt token and return it
    const token = genAuthToken(user.rows[0].id);
    res.send(token);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
