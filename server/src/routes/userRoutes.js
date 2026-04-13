const express = require("express");

const { register, login } = require("../controllers/userController")

const userRouter = express();

userRouter.post("/register", register);
userRouter.post("/login", login)

module.exports = userRouter;