const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
    },

    type: {
      type: String,
      enum: ["code", "resume"],
      required: true,
    },

    code: {
      type: String,
    },

    resumeText: {
      type: String,
    },

    result: {
      type: Object,
      required: true,
    },

    score: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Analysis = mongoose.model("Analysis", analysisSchema);

module.exports = Analysis;
