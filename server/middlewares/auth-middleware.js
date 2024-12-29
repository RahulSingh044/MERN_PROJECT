const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authMiddleware = async (req, res, next) => {

    const token = req.header('Authorization');

    // to remove the Bearer from the token
    const jwtToken = token.replace('Bearer ', '');

    if (!jwtToken) {
        return res.status(401).json({ message: "Token is missing" });
    }
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = userData;
        req.token = jwtToken;
        req.userID = userData._id;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired. Please login again.",
                expiredAt: error.expiredAt,
            });
        }

        console.error("Authentication Error:", error.message);
        res.status(401).json({ message: "Authentication failed", error: error.message });
    }
};

module.exports = authMiddleware;
