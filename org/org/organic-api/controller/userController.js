const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let data = req.body;
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: "User Already Registered",
      });
    }
    const hashedPass = await bcrypt.hash(data.password, 10);
    data.password = hashedPass;
    const newUser = await new User(data).save();
    // const user = await  User.findById(newUser._id)
    // console.log(user)

    const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY);
    res.status(201).json({
      success: true,
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        _id: newUser._id,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let data = req.body;
    const existing = await User.findOne({ email: data.email }).select(
      "password email _id username createdAt updatedAt role"
    );
    if (!existing) {
      return res.status(400).json({
        success: false,
        error: "User Not Found",
      });
    }

    const comparePass = await bcrypt.compare(data.password, existing.password);
    if (!comparePass) {
      return res.status(400).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ _id: existing._id }, process.env.SECRET_KEY);
    res.status(201).json({
      success: true,
      user: {
        username: existing.username,
        email: existing.email,
        role: existing.role,
        _id: existing._id,
        createdAt: existing.createdAt,
        updatedAt: existing.updatedAt,
        token,
      },

    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
