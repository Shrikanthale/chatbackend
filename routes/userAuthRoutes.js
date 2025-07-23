import express from "express";
import { getAllUser, logout, userLogin, userResgisteration } from "../controller/userAuthController.js";

const router = express.Router()


router.post("/signup",userResgisteration)
router.post("/signin",userLogin)
router.post("/logout",logout)
router.get("/", getAllUser )

export default router