import express, { Router } from "express"
import { createCourse, deleteCourse, fetchAllCourses, fetchSingleCourse, updateCourse } from "../../../controllers/school/course/courseController"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import upload from "../../../middleware/multerUpload"

const router:Router=express.Router()

router.route("/course").post(isLoggedIn,upload.single("courseThumbnail"),asyncErrorHandler(createCourse))
router.route("/course").get(isLoggedIn,asyncErrorHandler(fetchAllCourses))
router.route("/course/:id").get(isLoggedIn,asyncErrorHandler(fetchSingleCourse))
router.route("/course/:id").delete(isLoggedIn,asyncErrorHandler(deleteCourse))
router.route("/course/:id").patch(isLoggedIn,upload.single("courseThumbnail"),asyncErrorHandler(updateCourse))

export default router