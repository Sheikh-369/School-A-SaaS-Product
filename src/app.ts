import express from "express"

const app=express()
import authRoute from "./routes/global/auth/authRoute"
import schoolRoute from "./routes/school/schoolRoute"
import teacherRoute from "./routes/school/teacher/teacherRoute"

app.use(express.json())

app.use("/teaching",authRoute)
app.use("/teaching",schoolRoute)
app.use("/teaching/school",teacherRoute)

export default app