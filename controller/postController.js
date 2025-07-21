import Post from "../models/postsModels.js";
export const getPost = async(req,res) => {
    try {
        const response = await Post.find({userId:res.locals.user?._id})
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async(req,res) => {
    try {
        const { title , descripition } = req.body 
        if(!title || !descripition){
            return res.status(400).json({message:"every feild is required"})
        }       
        const response = await Post.create({userId:res.locals.user._id,title , descripition})
        res.status(201).json({message:"post create sucessfully" , response})
    } catch (error) {
        console.log(error)
    }
}