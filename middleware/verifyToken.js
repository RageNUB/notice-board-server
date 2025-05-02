// middleware/verifyToken.js
const admin = require("../firebaseAdmin");
const User = require("../models/User");

const verifyTokenAndRole = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.userEmail = decoded.email;

    const user = await User.findOne({ email: decoded.email });
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyTokenAndRole;
