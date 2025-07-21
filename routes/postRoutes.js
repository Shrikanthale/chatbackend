import express from "express"
import { createPost, getPost } from "../controller/postController.js"
import { authMiddleware } from "../middleware/authMiddlware.js"

const router = express.Router()

router.get("/", authMiddleware, getPost)
router.post("/create", authMiddleware ,createPost)

export default router