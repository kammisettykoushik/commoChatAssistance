const express = require("express");
const router = express.Router();
const Broadcast = require("../../models/whatsappmarketing/broadcast");
const Template = require("../../models/whatsappmarketing/template");

// GET: Fetch all broadcasts
router.get("/", async (req, res) => {
  try {
    const broadcasts = await Broadcast.findAll({
      include: [{ model: Template, attributes: ["templateName"] }],
    });
    res.status(200).json(broadcasts);
  } catch (error) {
    console.error("Error fetching broadcasts:", error);
    res.status(500).json({ error: "Failed to fetch broadcasts", details: error.message });
  }
});

// POST: Create a new broadcast
router.post("/", async (req, res) => {
  try {
    const { templateId, status, reason } = req.body;
    const template = await Template.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    const broadcast = await Broadcast.create({
      templateId,
      contactsCount: template.contactsCount,
      status: status || "Processing",
      reason,
      broadcastDate: new Date(),
    });

    res.status(201).json(broadcast);
  } catch (error) {
    console.error("Error creating broadcast:", error);
    res.status(500).json({ error: "Failed to create broadcast", details: error.message });
  }
});

module.exports = router;