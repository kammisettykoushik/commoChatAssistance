const express = require("express");
const router = express.Router();
const Template = require("../../models/whatsappmarketing/template");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Papa = require('papaparse'); // Import Papa Parse
const { parseContactsFile } = require("../../utils/parseContacts");
const slugify = require('slugify');
const axios = require('axios');
const WhatsApp = require('../../utils/WhatsApp'); // Import the WhatsApp module
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const authenticate = require("../../middlewares/authenticate");
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/whatsappmarketing/templates");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = file.fieldname === "contactsFile" ? [".csv", ".xlsx"] : [".jpg", ".jpeg", ".png", ".mp4"];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error(`Only ${allowedTypes.join(", ")} files are allowed for ${file.fieldname}`), false);
  }
};

const upload = multer({ storage, fileFilter });

// templateRoutes.js (updated POST route)
router.post("/", authenticate, upload.fields([{ name: "mediaFile" }, { name: "contactsFile" }]), async (req, res) => {
  const mediaFile = req.files["mediaFile"] ? req.files["mediaFile"][0] : null;
  const contactsFile = req.files["contactsFile"] ? req.files["contactsFile"][0] : null;
  const mediaUrl = mediaFile ? `/uploads/whatsappmarketing/templates/${mediaFile.filename}` : null;
  const contactsUrl = contactsFile ? `/uploads/whatsappmarketing/templates/${contactsFile.filename}` : null;

  const cleanupFiles = () => {
    try {
      if (mediaFile && fs.existsSync(mediaFile.path)) fs.unlinkSync(mediaFile.path);
      if (contactsFile && fs.existsSync(contactsFile.path)) fs.unlinkSync(contactsFile.path);
    } catch (cleanupErr) {
      console.error('Error during cleanup:', cleanupErr);
    }
  };

  try {
    const { templateName, category, header, mediaType, body, footer, mediaShape, automation, } = req.body;
    let contactsCount = 0;

    if (contactsFile) {
      try {
        const contactsData = await parseContactsFile(contactsFile.path);
        contactsCount = contactsData.length;
      } catch (parseErr) {
        console.error('Parsing error:', parseErr.message);
        cleanupFiles();
        return res.status(400).json({ error: `Failed to parse contacts file: ${parseErr.message}` });
      }
    }
    // Parse and validate automation
    const automationData = automation ? JSON.parse(automation) : null;
    if (automationData && !automationData.isImmediately && automationData.scheduleDate && automationData.scheduleTime) {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const scheduledDate = automationData.scheduleDate;
      const [time, period] = automationData.scheduleTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      // Check if date is in the past
      if (scheduledDate < today) {
        cleanupFiles();
        return res.status(400).json({ error: 'Schedule date cannot be in the past' });
      }

      // If scheduled for today, check if time is in the past
      if (scheduledDate === today) {
        if (hours < currentHour || (hours === currentHour && minutes < currentMinute)) {
          cleanupFiles();
          return res.status(400).json({ error: 'Schedule time cannot be in the past for today' });
        }
      }
    }

    // Generate slug from templateName if it's not provided
    let slug = req.body.slug || slugify(templateName, { lower: true });

    // Ensure the slug is unique by checking if it already exists in the database
    let existingTemplate = await Template.findOne({ where: { slug } });
    if (existingTemplate) {
      // Append a unique identifier (timestamp) to make the slug unique
      slug = `${slug}-${Date.now()}`;
    }

    // Create the template in the database

    const template = await Template.create({
      templateName,
      category,
      header,
      mediaType,
      mediaUrl,
      body,
      footer,
      mediaShape,
      contactsUrl,
      timestamp: new Date(),
      modifiedDate: new Date(),
      contactsCount,
      status: "Processing",
      reason: null,
      slug,
      automation: automationData, // Store automation settings
      userId: req.user.id,
    });

    res.status(201).json(template);
  } catch (error) {
    console.error("Error in POST /templates:", error);
    cleanupFiles();
    res.status(500).json({ error: "Failed to save template", details: error.message });
  }
});

// GET: Fetch all templates
router.get("/", authenticate, async (req, res) => {
  try {
    const templates = await Template.findAll({ where: { userId: req.user.id } });
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ error: "Failed to fetch templates", details: error.message });
  }
});

// DELETE: Remove a template by ID
router.delete("/:slug", authenticate, async (req, res) => {
  try {
    const templateSlug = req.params.slug.trim().toLowerCase();
    const template = await Template.findOne({ where: { slug: templateSlug, userId: req.user.id } }); // Find by slug
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    // Delete associated files
    if (template.mediaUrl && fs.existsSync(path.join(__dirname, "../../", template.mediaUrl))) {
      fs.unlinkSync(path.join(__dirname, "../../", template.mediaUrl));
    }
    if (template.contactsUrl && fs.existsSync(path.join(__dirname, "../../", template.contactsUrl))) {
      fs.unlinkSync(path.join(__dirname, "../../", template.contactsUrl));
    }

    // Delete the template from the database
    await template.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ error: "Failed to delete template", details: error.message });
  }
});


// GET: Read contacts file for a specific template
router.get("/:slug/contacts", authenticate, async (req, res) => {
  try {
    const templateSlug = req.params.slug;
    const template = await Template.findOne({ where: { slug: templateSlug, userId: req.user.id } });
    if (!template || !template.contactsUrl) {
      return res.status(404).json({ error: "Template or contacts file not found" });
    }

    const filePath = path.join(__dirname, "../../", template.contactsUrl);
    const contactsData = await parseContactsFile(filePath);
    res.status(200).json(contactsData);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    res.status(500).json({ error: "Failed to read contacts file", details: error.message });
  }
});

// PUT: Update a template by ID
router.put("/:slug", authenticate, async (req, res) => {
  try {
    const templateSlug = req.params.slug;
    const template = await Template.findByPk({ where: { slug: templateSlug, userId: req.user.id } });
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    const { templateName, timestamp, modifiedDate, status } = req.body;
    await template.update({
      templateName: templateName || template.templateName,
      timestamp: timestamp || template.timestamp,
      modifiedDate: modifiedDate || new Date(),
      status: status || template.status,
    });

    res.status(200).json(template);
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ error: "Failed to update template", details: error.message });
  }
});

// PUT: Update contacts for a template (handle deletion here)
router.put("/:slug/contacts", authenticate, async (req, res) => {
  try {
    const { slug } = req.params;
    const { contacts } = req.body; // The new list of contacts after deletion

    // Find the template by slug
    const template = await Template.findOne({ where: { slug, userId: req.user.id } });
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    // Update the contacts file
    if (template.contactsUrl) {
      const filePath = path.join(__dirname, "../../", template.contactsUrl);
      
      // Update the contactsCount based on the new contacts list
      const updatedContactsCount = contacts.length;
      
      // Update the template's contact count in the database
      await template.update({ contactsCount: updatedContactsCount });

      // Convert contacts array to CSV and save to file
      const csvData = Papa.unparse(contacts); // Convert contacts array to CSV
      await fs.promises.writeFile(filePath, csvData); // Write updated CSV to file
    }

    res.status(200).json({ message: "Contacts updated successfully", contactsCount: contacts.length });
  } catch (error) {
    console.error("Error updating contacts:", error);
    res.status(500).json({ error: "Failed to update contacts", details: error.message });
  }
});

router.post("/:slug/send", authenticate, async (req, res) => {
  try {
    const slug = req.params.slug;
    const template = await Template.findOne({ where: { slug, userId: req.user.id } });
    if (!template || !template.contactsUrl) {
      return res.status(404).json({ error: "Template or contacts not found" });
    }

    const filePath = path.join(__dirname, "../../", template.contactsUrl);
    const contacts = await parseContactsFile(filePath);
    console.log("📞 Parsed contacts:", contacts.map(c => c["Phone"] || c["number"]));

    const batchSize = 10; // 10 messages per second
    const delayBetweenBatchesMs = 1000; // 1 second

    const totalContacts = contacts.length;
    let sentCount = 0;
    let failedCount = 0;

    for (let i = 0; i < totalContacts; i += batchSize) {
      const batch = contacts.slice(i, i + batchSize);

      await Promise.all(batch.map(async (contact) => {
        const phone = contact["Phone"] || contact["phone"] || contact["number"];
        if (!/^\+?\d{10,15}$/.test(phone)) {
          console.warn(`⚠️ Skipping invalid phone number: ${phone}`);
          failedCount++;
          return;
        }

        try {
          await WhatsApp(phone, {
            name: template.name,
            header: template.header,
            body: template.body,
            footer: template.footer,
            mediaUrl: template.mediaUrl ? `${process.env.REACT_APP_API_URL}${template.mediaUrl}` : null,
            mediaType: template.mediaType,
          });
          sentCount++;
        } catch (error) {
          console.error(`Failed to send message to ${phone}:`, error.message);
          failedCount++;
        }
      }));

      console.log(`Batch ${i / batchSize + 1} sent.`);
      if (i + batchSize < totalContacts) {
        console.log(`⏳ Waiting ${delayBetweenBatchesMs}ms before next batch...`);
        await delay(delayBetweenBatchesMs);
      }
    }

    // console.log(`✅ Bulk sending completed. Sent: ${sentCount}, Failed: ${failedCount}`);

    res.status(200).json({ 
      message: "Messages sending completed", 
      totalContacts, 
      sent: sentCount, 
      failed: failedCount 
    });
  } catch (error) {
    console.error("Error sending messages:", error);
    res.status(500).json({ error: "Failed to send messages", details: error.message });
  }
});


module.exports = router;