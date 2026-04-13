const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require('cookie-parser')

const connect = require("./src/config/Connection")

const userRouter = require("./src/routes/userRoutes")

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

connect()
app.use(cookieParser())


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/user", userRouter)


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on ${port}`))

