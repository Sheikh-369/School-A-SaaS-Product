import express, { Router } from "express"
import userRegister from "../../../controllers/global/auth/authController"

const router:Router=express.Router()

router.route("/register").post(userRegister)

export default router