import User from "../models/userAuthModels.js";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcryptjs";
const userResgisteration = async (req,res) =>{
    try {
        const {name , email , password, gender } = req.body
        if(!name || !email || !password || !gender){
            return res.status(500).json("every feild is required")
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"user alredy exists"})
        }
        const profilePicBoy = `https://avatar.iran.liara.run/public/boy`
        const profilePicGirl = `https://avatar.iran.liara.run/public/girl`

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password , salt)
        const response = await User.create({name , email , password:hashPassword , gender , profilePic : gender === "male" ? profilePicBoy : profilePicGirl })
        res.status(201).json({message:"register successfully" , response})
    } catch (error) {
        console.log(error)
    }
}

const userLogin = async(req,res) =>  {
    try {
        const {email , password} = req.body
        if(!email || !password){
            return res.status(400).json({message:"every feild is required"})
        }
        const response = await User.findOne({ email });
        if (!response) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, response.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({id:response._id , email},process.env.JWT_SECRET,{expiresIn:"60m"})
        console.log(token)
        res.status(200).json({message:"login sucessfully",token})
    } catch (error) {
        console.log(error)
    }
}

const getAllUser = async(req,res) => {
    try {
        const response = await User.find()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}

export {userResgisteration , userLogin ,getAllUser}