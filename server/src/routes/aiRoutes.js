const express = require("express");
const upload = require("../middlewares/upload");

const {
  analyzeCode,
  getAllAnalysis,
  getSingleAnalysis,
  deleteAnalysis,
  analyzeResume
} = require("../controllers/aiController");

const verifyToken = require("../middlewares/verifyToken");

const aiRouter = express.Router();

aiRouter.post("/analyze", verifyToken, analyzeCode);
aiRouter.get("/analysis", verifyToken, getAllAnalysis);
aiRouter.get("/analysis/:id", verifyToken, getSingleAnalysis);
aiRouter.delete("/analysis/:id", verifyToken, deleteAnalysis);

aiRouter.post("/resume", verifyToken, upload.single("resume"), analyzeResume);

module.exports = aiRouter;
