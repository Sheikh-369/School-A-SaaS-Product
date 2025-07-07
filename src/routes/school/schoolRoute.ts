import express, { Router } from "express"
import isLoggedIn from "../../middleware/middleware"
import { createCategoryTable, createCourseTable, createSchool, createStudentTable, createTeacherTable } from "../../controllers/school/schoolController"

const router:Router=express.Router()

router.route("/school").post(isLoggedIn,createSchool,createTeacherTable,createStudentTable,createCategoryTable,createCourseTable)

export default router