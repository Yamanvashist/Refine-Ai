const Order = require("../models/order");
const razorPay = require("../config/razorpay");

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    let credits = 0;

    if (amount === 299) credits = 50;
    if (amount === 599) credits = 120;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const razorOrder = await razorPay.orders.create(options);

    await Order.create({
      userId: req.user.id,
      razorPayOrderId: razorOrder.id,
      amount,
      credits,
      status: "created",
    });

    res.json(razorOrder);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

module.exports = { createOrder };