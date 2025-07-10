import express, { Router } from "express"
import isLoggedIn from "../../middleware/middleware"
import { createCategoryTable, createCourseTable, createSchool, createStudentTable, createTeacherTable } from "../../controllers/school/schoolController"
import asyncErrorHandler from "../../services/asyncErrorHandler"

const router:Router=express.Router()

router.route("/school").post(isLoggedIn,asyncErrorHandler(createSchool),asyncErrorHandler(createTeacherTable),asyncErrorHandler(createStudentTable),asyncErrorHandler(createCategoryTable),asyncErrorHandler(createCourseTable))

export default router