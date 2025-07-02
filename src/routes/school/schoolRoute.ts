import express, { Router } from "express"
import createSchool from "../../controllers/school/schoolController"
import isLoggedIn from "../../middleware/middleware"

const router:Router=express.Router()

router.route("/school").post(isLoggedIn,createSchool)

export default router