const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = await UserModel.findById(decoded.id).select("-password"); // ✅ FIX

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message); // 🔥 debug
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = protect;