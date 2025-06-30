import express, { Router } from "express"
import { userLogin, userRegister } from "../../../controllers/global/auth/authController"

const router:Router=express.Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

export default router