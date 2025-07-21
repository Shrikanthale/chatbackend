import express from "express";
import { getAllUser, userLogin, userResgisteration } from "../controller/userAuthController.js";

const router = express.Router()


router.post("/signup",userResgisteration)
router.post("/signin",userLogin)
router.get("/", getAllUser )

export default router