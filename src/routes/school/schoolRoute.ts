import express, { Router } from "express"
import createSchool from "../../controllers/school/schoolController"

const router:Router=express.Router()

router.route("/school").post(createSchool)

export default router