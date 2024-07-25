const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);

    let message = "Token verification failed";
    if (error.name === "TokenExpiredError") {
      message = "Token has expired";
    } else if (error.name === "JsonWebTokenError") {
      message = "Invalid token";
    } else if (error.name === "NotBeforeError") {
      message = "Token is not active yet";
    }

    return res.status(403).json({
      message,
    });
  }
};

module.exports = authMiddleware;
