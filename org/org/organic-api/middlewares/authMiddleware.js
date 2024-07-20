const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.checkUser = async (req, res, next) => {
  try {
    let headers = req.headers.authorization;
    if (!headers) {
      return res.status(400).json({
        success: false,
        error: "No Headers provided",
      });
    }
    // ("Bearer kajfkajdaldkasl");
    let token = headers.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        success: false,
        error: "No Token provided",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "Invalid Token",
        });
      }
      let user = await User.findById(decoded?._id).select("-password");
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "No User Found with provided token",
        });
      }
      req.user = user;
      next()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.checkAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next()
    } else {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to access this api"
      })
    }
  } catch (error) {

  }
}  