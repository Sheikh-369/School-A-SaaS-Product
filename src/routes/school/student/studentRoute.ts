import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import { createStudent, deleteStudent, fetchAllStudents, fetchSingleStudent, updateStudent } from "../../../controllers/school/student/studentController"

const router:Router=express.Router()

router.route("/student").post(isLoggedIn,createStudent)
router.route("/student").get(isLoggedIn,fetchAllStudents)
router.route("/student/:id").get(isLoggedIn,fetchSingleStudent)
router.route("/student/:id").delete(isLoggedIn,deleteStudent)
router.route("/student/:id").patch(isLoggedIn,updateStudent)

export default router
