const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header (Bearer <token>)
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Unauthorized", message: "Token is missing" });
  }

  try {
    // Verify token
    const { username, user_id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, user_id };
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Unauthorized", message: "Authentication is invalid" });
  }
};

module.exports = authMiddleware;
