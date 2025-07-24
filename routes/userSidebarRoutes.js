import express from "express"
import { getUSerForSidebar } from "../controller/userSidebarController.js"
import { protectRoute } from "../middleware/protectedRoutes.js"
const router = express.Router()

router.get("/", protectRoute ,getUSerForSidebar)

export default router