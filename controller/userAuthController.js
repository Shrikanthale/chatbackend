import User from "../models/userAuthModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register User
const userResgisteration = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;

        if (!name || !email || !password || !gender) {
            return res.status(400).json({ message: "Every field is required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const profilePicBoy = `https://avatar.iran.liara.run/public/boy`;
        const profilePicGirl = `https://avatar.iran.liara.run/public/girl`;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? profilePicBoy : profilePicGirl
        });

        res.status(201).json({ message: "Registered successfully", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// Login User
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Every field is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        // Set cookie
        // NOTE: In production, ensure NODE_ENV is set to 'production' for secure cookies
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Respond with user info (excluding password)
        const userInfo = {
            _id: user._id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            profilePic: user.profilePic
        };

        res.status(200).json({ message: "Login successfully", user: userInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error during login" });
    }
};

// Get All Users
const getAllUser = async (req, res) => {
    try {
        const response = await User.find().select("-password");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Logout User
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Logout error" });
    }
};

export { userResgisteration, userLogin, getAllUser, logout };
