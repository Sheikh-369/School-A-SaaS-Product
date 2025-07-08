import express, { Router } from "express"
import { createCourse, deleteCourse, fetchAllCourses, fetchSingleCourse, updateCourse } from "../../../controllers/school/course/courseController"
import isLoggedIn from "../../../middleware/middleware"

const router:Router=express.Router()

router.route("/course").post(isLoggedIn,createCourse)
router.route("/course").get(isLoggedIn,fetchAllCourses)
router.route("/course/:id").get(isLoggedIn,fetchSingleCourse)
router.route("/course/:id").delete(isLoggedIn,deleteCourse)
router.route("/course/:id").patch(isLoggedIn,updateCourse)

export default router