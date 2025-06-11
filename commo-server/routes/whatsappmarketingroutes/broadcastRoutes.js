const express = require("express");
const router = express.Router();
const Broadcast = require("../../models/whatsappmarketing/broadcast");
const Template = require("../../models/whatsappmarketing/template");
const authenticate = require("../../middlewares/authenticate");

// GET: Fetch all broadcasts
router.get("/", authenticate, async (req, res) => {
  try {
    const broadcasts = await Broadcast.findAll({
      where: { userId: req.user.id },
      include: [{ model: Template, attributes: ["templateName"] }],
    });
    res.status(200).json(broadcasts);
  } catch (error) {
    console.error("Error fetching broadcasts:", error);
    res.status(500).json({ error: "Failed to fetch broadcasts", details: error.message });
  }
});

// POST: Create a new broadcast
router.post("/", authenticate, async (req, res) => {
  try {
    const { templateId, status, reason } = req.body;
    const template = await Template.findOne({ where: { id: templateId, userId: req.user.id } });
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    const broadcast = await Broadcast.create({
      templateId,
      userId: req.user.id, 
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