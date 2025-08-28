import express, { Router } from "express"
import { createCategoryTable, createCourseTable, createSchool, createStudentTable, createTeacherTable } from "../../controllers/school/schoolController"
import asyncErrorHandler from "../../services/asyncErrorHandler"
import { isLoggedIn } from "../../middleware/middleware"

const router:Router=express.Router()

router.route("/school").post(isLoggedIn,asyncErrorHandler(createSchool),asyncErrorHandler(createTeacherTable),asyncErrorHandler(createStudentTable),asyncErrorHandler(createCategoryTable),asyncErrorHandler(createCourseTable))

export default router