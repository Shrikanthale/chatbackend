import jwt from "jsonwebtoken";
import User from "../models/userAuthModels.js";
export const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;

        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1]; // from Bearer token
        }

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Unauthorized - invalid token" });
    }
};
