import express from "express";
import { getMessage, sendMessage } from "../controller/messageController.js";
import { protectRoute } from "../middleware/protectedRoutes.js";

const router = express.Router()

router.post("/:id" , protectRoute , getMessage)
router.post("/send/:id" , protectRoute ,sendMessage)

export default router