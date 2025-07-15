import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { createCategory, deleteCategory, fetchAllCategories, fetchSingleCategory, updateCategory } from "../../../controllers/school/category/categoryController"

const router:Router=express.Router()

router.route("/category").post(isLoggedIn,asyncErrorHandler(createCategory))
router.route("/category").get(isLoggedIn,asyncErrorHandler(fetchAllCategories))
router.route("/category/:id").get(isLoggedIn,asyncErrorHandler(fetchSingleCategory))
router.route("/category/:id").patch(isLoggedIn,asyncErrorHandler(updateCategory))
router.route("/category/:id").delete(isLoggedIn,asyncErrorHandler(deleteCategory))

export default router