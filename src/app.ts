import express from "express"

const app=express()
import authRoute from "./routes/global/auth/authRoute"
import schoolRoute from "./routes/school/schoolRoute"
import teacherRoute from "./routes/school/teacher/teacherRoute"
import courseRoute from "./routes/school/course/courseRoute"
import studentRoute from "./routes/school/student/studentRoute"

app.use(express.json())

app.use("/teaching",authRoute)
app.use("/teaching",schoolRoute)
app.use("/teaching/school",teacherRoute)
app.use("/teaching/school",courseRoute)
app.use("/teaching/school",studentRoute)

export default app