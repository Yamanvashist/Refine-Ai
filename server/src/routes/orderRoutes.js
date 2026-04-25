const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { createOrder } = require("../controllers/orderController");
const verifyPayment = require("../middlewares/verifyPayment")

const orderRouter = express.Router();

orderRouter.post("/create-order", verifyToken, createOrder);

orderRouter.post("/verify-payment", verifyToken, verifyPayment);

module.exports = orderRouter;