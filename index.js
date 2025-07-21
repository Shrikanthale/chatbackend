import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userAuthRoutes from "./routes/userAuthRoutes.js"
import postRoutes from "./routes/postRoutes.js"
dotenv.config()
connectDB()
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: ["http://localhost:3000" , "http://localhost:8000" , "http://localhost:5173"],
    credentials: true,
}))



app.use("/api/user", userAuthRoutes)
app.use("/api/post",postRoutes)
const PORT = process.env.PORT
app.listen(PORT , ()=> console.log(`your port is running on ${PORT}`))