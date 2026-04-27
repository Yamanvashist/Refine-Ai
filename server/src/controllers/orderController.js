const Order = require("../models/order");
const razorPay = require("../config/razorpay");

const createOrder = async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    console.log("REQ BODY ", req.body);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const creditMap = {
      299: 50,
      599: 120,
    };

    const credits = creditMap[amount] || 0;

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

    console.log("CREATED ORDER 👉", razorOrder.id);

    res.json(razorOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

module.exports = { createOrder };