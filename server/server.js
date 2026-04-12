const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on ${port}`))

