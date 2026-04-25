const groq = require("../config/groq")
const Analysis = require("../models/analysis");
const User = require("../models/user");
const pdfParse = require("pdf-parse");


const safeParse = (text) => {
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
};

const analyzeCode = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Not authorized" });
    if (!code) return res.status(400).json({ message: "Code is required" });

    const user = await User.findById(userId);
    if (!user || user.credits <= 0) {
      return res.status(403).json({ message: "No credits left" });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: "You are a senior software engineer. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: `
{
  "score": number,
  "issues": string[],
  "suggestions": string[],
  "improvedCode": string
}

IMPORTANT:
- Always include improvedCode
- If no improvement, return original code

Code:
${code}
          `,
        },
      ],
    });

    const text = response.choices[0].message.content;
    const parsed = safeParse(text);

    if (!parsed) {
      return res.status(500).json({ message: "Invalid JSON from AI" });
    }

    const analysis = await Analysis.create({
      userId,
      type: "code",
      title: "Code Analysis",
      code,
      result: parsed,
      score: parsed.score,
    });

    user.credits -= 1;
    await user.save();

    res.json({
      success: true,
      data: parsed,
      credits: user.credits,
      analysisId: analysis._id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Code analysis failed" });
  }
};

const analyzeResume = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Not authorized" });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findById(userId);
    if (!user || user.credits <= 0) {
      return res.status(403).json({ message: "No credits left" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text.slice(0, 8000);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a strict technical recruiter. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: `
{
  "score": number,
  "missingSkills": string[],
  "improvements": string[],
  "summary": string
}

Be harsh and realistic.

Resume:
${text}
          `,
        },
      ],
    });

    const raw = response.choices[0].message.content;
    const parsed = safeParse(raw);

    if (!parsed) {
      return res.status(500).json({ message: "Invalid JSON from AI" });
    }

    const analysis = await Analysis.create({
      userId,
      type: "resume",
      title: "Resume Analysis",
      code: text, 
      result: parsed,
      score: parsed.score,
    });

    user.credits -= 1;
    await user.save();

    res.json({
      success: true,
      data: parsed,
      credits: user.credits,
      analysisId: analysis._id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Resume analysis failed" });
  }
};


const getAllAnalysis = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Analysis.find({ userId })
      .sort({ createdAt: -1 })
      .select("-result");

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

const getSingleAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await Analysis.findOne({ _id: id, userId });

    if (!analysis) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, data: analysis });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analysis" });
  }
};

const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await Analysis.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  analyzeCode,
  analyzeResume,
  getAllAnalysis,
  getSingleAnalysis,
  deleteAnalysis,
};