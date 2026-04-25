const crypto = require("crypto");
const User = require("../models/user");
const Order = require("../models/order");

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    console.log("VERIFYING ORDER 👉", razorpay_order_id);

    const userId = req.user.id;

    const order = await Order.findOne({
      razorPayOrderId: razorpay_order_id,
    });

    console.log("FOUND ORDER 👉", order);

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized order access" });
    }

    if (order.status === "paid") {
      return res.status(400).json({ message: "Already processed" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    console.log("EXPECTED 👉", expectedSign);
    console.log("RECEIVED 👉", razorpay_signature);

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    order.paymentId = razorpay_payment_id;
    order.signature = razorpay_signature;
    order.status = "paid";
    await order.save();

    await User.findByIdAndUpdate(userId, {
      $inc: { credits: order.credits || 0 },
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

module.exports = verifyPayment;