const express = require("express");

const { register, login, logout } = require("../controllers/userController");
const googleAuth = require("../controllers/googleAuthController")
const verifyToken = require("../middlewares/verifyToken");

const User = require("../models/user")

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/auth/google", googleAuth);
userRouter.get("/checkAuth", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server can't digest" });
  }
});

module.exports = userRouter;
