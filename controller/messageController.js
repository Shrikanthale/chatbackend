import Conversion from "../models/conversionModels.js";
import Message from "../models/messageModels.js";

export const sendMessage = async(req,res) => {
    try {
        const {message} = req.body
        const {id :reciverId } = req.params
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized: No user found in request" });
        }
        const senderId = req.user._id

        let conversion = await Conversion.findOne({
            participants : {$all : [senderId , reciverId]}
        })

        if(!conversion){
            conversion = await Conversion.create({
                participants : [senderId , reciverId]
            })
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message
        })

        if(newMessage){
            conversion.messages.push(newMessage._id)
        }
        await conversion.save()
        await newMessage.save()
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
}

export const getMessage = async(req,res) => {
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const conversion = await Conversion.findOne({
            participants:{$all : [senderId , userToChatId]}
        }).populate("messages")

        if(!conversion) return res.status(500).json([])

        let messages = conversion.messages
        res.status(200).json({messages})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
}

