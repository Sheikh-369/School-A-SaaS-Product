import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import createTeacher from "../../../controllers/school/teacher/teacherController"

const router:Router=express.Router()

router.route("/teacher").post(isLoggedIn,createTeacher)

export default router