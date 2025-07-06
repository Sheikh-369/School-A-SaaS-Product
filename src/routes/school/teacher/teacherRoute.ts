import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import { createTeacher, deleteTeacher, fetchAllTeacher, fetchSingleTeacher } from "../../../controllers/school/teacher/teacherController"

const router:Router=express.Router()

router.route("/teacher").post(isLoggedIn,createTeacher)
router.route("/teacher").get(isLoggedIn,fetchAllTeacher)
router.route("/teacher/:id").get(isLoggedIn,fetchSingleTeacher)
router.route("/teacher/:id").delete(isLoggedIn,deleteTeacher)

export default router