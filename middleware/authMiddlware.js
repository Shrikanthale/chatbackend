
import jwt from "jsonwebtoken"
import User from "../models/userAuthModels.js";

export const authMiddleware =async (req, res, next) => {
  const authHeader = req.headers.authorization;  // req header check karega auth. token hai ki nahi check karega
  if (!authHeader || !authHeader.startsWith('Bearer ')) {    
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  const token = authHeader.split(" ")[1];    // Bearer "token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user =await User.findById(decoded.id)
    res.locals.user = user
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};



// export const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: 'User not found' });

//     res.locals.user = user; // or req.user = user
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };


