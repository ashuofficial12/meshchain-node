const jwt = require("jsonwebtoken");
const User = require("../models/User");

<<<<<<< HEAD
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied. No token provided!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.userId = decoded.userId;  // Save userId directly to req.userId
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token!" });
  }
=======
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Token missing" });
        }


        // Token Verify Karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // User Fetch Karna
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        req.user = user; // ✅ `req.user` me login user store karein
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token", details: error.message });
    }
>>>>>>> 29359f909882d1e6a7cd63d443fd90298019a855
};

module.exports = verifyToken;
