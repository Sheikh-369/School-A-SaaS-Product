import express from "express"

const app=express()
import authRoute from "./routes/global/auth/authRoute"
import schoolRoute from "./routes/school/schoolRoute"
app.use(express.json())

app.use("/teaching",authRoute)
app.use("/teaching",schoolRoute)

export default app