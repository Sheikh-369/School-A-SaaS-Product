import express, { Router } from "express"
import { createTeacher, deleteTeacher, fetchAllTeacher, fetchSingleTeacher, updateTeacher } from "../../../controllers/school/teacher/teacherController"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { accessTo, isLoggedIn, Role } from "../../../middleware/middleware"

const router:Router=express.Router()

router.route("/teacher").post(isLoggedIn,accessTo(Role.School),asyncErrorHandler(createTeacher))
router.route("/teacher").get(isLoggedIn,asyncErrorHandler(fetchAllTeacher))
router.route("/teacher/:id").get(isLoggedIn,asyncErrorHandler(fetchSingleTeacher))
router.route("/teacher/:id").delete(isLoggedIn,accessTo(Role.School),asyncErrorHandler(deleteTeacher))
router.route("/teacher/:id").patch(isLoggedIn,accessTo(Role.School),asyncErrorHandler(updateTeacher))

export default router