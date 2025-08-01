import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import { createStudent, deleteStudent, fetchAllStudents, fetchSingleStudent, updateStudent } from "../../../controllers/school/student/studentController"
import asyncErrorHandler from "../../../services/asyncErrorHandler"

const router:Router=express.Router()

router.route("/student").post(isLoggedIn,asyncErrorHandler(createStudent))
router.route("/student").get(isLoggedIn,asyncErrorHandler(fetchAllStudents))
router.route("/student/:id").get(isLoggedIn,asyncErrorHandler(fetchSingleStudent))
router.route("/student/:id").delete(isLoggedIn,asyncErrorHandler(deleteStudent))
router.route("/student/:id").patch(isLoggedIn,asyncErrorHandler(updateStudent))

export default router
