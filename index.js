import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userAuthRoutes from "./routes/userAuthRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
dotenv.config()
connectDB()
const app = express()



app.use(cors({
    origin: ["http://localhost:3000" , "http://localhost:8000" , "http://localhost:5173"],
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))



app.use("/api/user", userAuthRoutes)
app.use("/api/post",postRoutes)
app.use("/api/message",messageRoutes)
const PORT = process.env.PORT
app.listen(PORT , ()=> console.log(`your port is running on ${PORT}`))