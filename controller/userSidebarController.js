import User from "../models/userAuthModels.js"


export const getUSerForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id

        const filterUSer = await User.find({_id : {$ne : loggedInUserId}}).select("-password")
        res.status(200).json(filterUSer)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
} 