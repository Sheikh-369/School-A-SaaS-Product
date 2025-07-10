import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import { createTeacher, deleteTeacher, fetchAllTeacher, fetchSingleTeacher, updateTeacher } from "../../../controllers/school/teacher/teacherController"
import asyncErrorHandler from "../../../services/asyncErrorHandler"

const router:Router=express.Router()

router.route("/teacher").post(isLoggedIn,asyncErrorHandler(createTeacher))
router.route("/teacher").get(isLoggedIn,asyncErrorHandler(fetchAllTeacher))
router.route("/teacher/:id").get(isLoggedIn,asyncErrorHandler(fetchSingleTeacher))
router.route("/teacher/:id").delete(isLoggedIn,asyncErrorHandler(deleteTeacher))
router.route("/teacher/:id").patch(isLoggedIn,asyncErrorHandler(updateTeacher))

export default router