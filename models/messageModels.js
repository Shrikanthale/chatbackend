import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    message:{
        type:String,
        require:true
    }
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)

export default Message