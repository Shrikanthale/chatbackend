import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    descripition:{
        type:String,
        require:true
    }
},{timestamps:true})

const Post = mongoose.model("Post" , postSchema)

export default Post