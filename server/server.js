const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connect = require("./src/config/Connection");

const userRouter = require("./src/routes/userRoutes");
const aiRouter = require("./src/routes/aiRoutes");
const orderRouter = require("./src/routes/orderRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

connect();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/ai", aiRouter);
app.use("/order", orderRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
