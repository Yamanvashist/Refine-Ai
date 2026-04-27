const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    razorPayOrderId: {
      type: String,
      required: true,
    },

    razorPayPaymentId: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    credits: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },

    plan: {
      type: String,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
