const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const contactsms = require("../../models/smsmarketing/contactsms");
const multer = require("multer");
const csv = require("csv-parser");

// Ensure directory exists
const dir = "uploads/smsmarketing";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

// POST: Create a campaign
router.post("/", upload.single("contactsFile"), async (req, res) => {
  try {
    const {
      campaignName,
      campaignFrom,
      sendDate,
      description,
    } = req.body;

    const contactsUrl = req.file ? req.file.path : null;

    let contactsCount = 0;

    // Count contacts from CSV file
    if (contactsUrl) {
      const rows = [];
      fs.createReadStream(contactsUrl)
        .pipe(csv())
        .on("data", (row) => {
          // Optional: You can check for a column like 'phone' or 'number'
          rows.push(row);
        })
        .on("end", async () => {
          contactsCount = rows.length;

          const newCampaign = await contactsms.create({
            campaignName,
            campaignFrom,
            sendDate,
            description,
            contactsUrl,
            contactsCount,
            status: "Processing",
          });

          res.status(201).json({
            message: "Campaign saved successfully",
            data: newCampaign,
          });
        })
        .on("error", (error) => {
          console.error("CSV parsing error:", error);
          res.status(500).json({ message: "Failed to parse CSV file", error: error.message });
        });
    } else {
      return res.status(400).json({ message: "No contacts file uploaded" });
    }
  } catch (error) {
    console.error("Error saving campaign:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// GET: All campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await contactsms.findAll(); // Fixed
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch campaigns", error: error.message });
  }
});

module.exports = router;
