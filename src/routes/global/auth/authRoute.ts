import express, { Router } from "express"
import { forgotPassword, resetPassword, userLogin, userRegister } from "../../../controllers/global/auth/authController"

const router:Router=express.Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)

export default router