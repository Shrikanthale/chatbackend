import jwt from "jsonwebtoken";
import User from "../models/userAuthModels.js";
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "unauthorize - no token" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "unauthorize - invalid user" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
};
