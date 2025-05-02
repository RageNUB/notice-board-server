const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");
const verifyTokenAndRole = require("../middleware/verifyToken");

router.post("/", verifyTokenAndRole, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newNotice = new Notice({
      title,
      description,
      createdBy: req.userEmail,
    });

    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    console.error("Create notice error:", error);
    res.status(500).json({ message: "Failed to create notice" });
  }
});

router.get("/", async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});

module.exports = router;
