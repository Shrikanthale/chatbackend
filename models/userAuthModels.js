import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true,
        enum:["male","female","other"]
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model("User" , userSchema)

export default User