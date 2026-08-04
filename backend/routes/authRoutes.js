const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// Register user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }


    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }


    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });


  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;