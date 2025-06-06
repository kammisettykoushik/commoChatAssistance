const express = require("express");
const router = express.Router();
const campaignsms = require("../../models/smsmarketing/campaignsms");
const authenticate = require("../../middlewares/authenticate");


router.post("/", authenticate, async (req, res) => {
    try {
        // console.log("Incoming request body:", req.body);
        const newCampaign = await campaignsms.create({
            ...req.body,
            userId: req.user.id, // <-- Set userId from authenticated user
        });
        res.status(201).json({ message: "Campaign saved successfully", data: newCampaign });
    } catch (error) {
        console.error("Error saving campaign:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/", authenticate, async (req, res) => {
    try {
      const templates = await campaignsms.findAll(
        {
        where: { userId: req.user.id } // <-- Only fetch user's campaigns
      }
      );
      res.status(200).json(templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ error: "Failed to fetch templates", details: error.message });
    }
  });

  router.put("/:id", authenticate, async (req, res) => {
    try {
      const { id } = req.params;
  
      const [updated] = await campaignsms.update(req.body, {
        where: { id: id, userId: req.user.id }
      });
  
      if (updated === 0) {
        return res.status(404).json({ message: "Contact not found or nothing changed." });
      }
  
      res.status(200).json({ message: "Contact updated successfully", data: req.body });
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
  router.delete("/:id", authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await campaignsms.destroy({
        where: { id: id, userId: req.user.id }
      });
  
      if (deleted === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
  
module.exports = router;