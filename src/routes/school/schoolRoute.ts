import express, { Router } from "express"
import isLoggedIn from "../../middleware/middleware"
import { createCourseTable, createSchool, createStudentTable, createTeacherTable } from "../../controllers/school/schoolController"

const router:Router=express.Router()

router.route("/school").post(isLoggedIn,createSchool,createTeacherTable,createStudentTable,createCourseTable)

export default router