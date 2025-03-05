const express = require("express");
const router = express.Router();
const Template = require("../../models/whatsappmarketing/template");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { parse } = require("csv-parse"); // For CSV parsing
const XLSX = require("xlsx"); // For Excel parsing

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

// ... (other imports and multer config remain the same)

// POST: Create a new template
router.post("/", upload.fields([{ name: "mediaFile" }, { name: "contactsFile" }]), async (req, res) => {
  try {
    const { templateName, category, header, mediaType, body, footer, mediaShape, status } = req.body;
    const mediaUrl = req.files["mediaFile"] ? `/uploads/whatsappmarketing/templates/${req.files["mediaFile"][0].filename}` : null;
    const contactsUrl = req.files["contactsFile"] ? `/uploads/whatsappmarketing/templates/${req.files["contactsFile"][0].filename}` : null;

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
      modifiedDate: new Date(), // Set initial modified date
      status: status || "Draft",
    });

    res.status(201).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save template", details: error.message });
  }
});

// GET: Fetch all templates
router.get("/", async (req, res) => {
  console.log("Fetching templates...");
  try {
    const templates = await Template.findAll();
    console.log("Templates fetched:", templates);
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ error: "Failed to fetch templates", details: error.message });
  }
});

// DELETE: Remove a template by ID
router.delete("/:id", async (req, res) => {
  try {
    const templateId = req.params.id;
    const template = await Template.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    if (template.mediaUrl) fs.unlinkSync(path.join(__dirname, "../../", template.mediaUrl));
    if (template.contactsUrl) fs.unlinkSync(path.join(__dirname, "../../", template.contactsUrl));

    await template.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete template", details: error.message });
  }
});

// GET: Read contacts file for a specific template
router.get("/:id/contacts", async (req, res) => {
  try {
    const templateId = req.params.id;
    const template = await Template.findByPk(templateId);
    if (!template || !template.contactsUrl) {
      return res.status(404).json({ error: "Template or contacts file not found" });
    }

    const filePath = path.join(__dirname, "../../", template.contactsUrl);
    const ext = path.extname(template.contactsUrl).toLowerCase();
    let contacts = [];

    if (ext === ".csv") {
      const csvData = fs.readFileSync(filePath, "utf8");
      contacts = await new Promise((resolve, reject) => {
        const results = [];
        parse(csvData, { columns: true, trim: true })
          .on("data", (row) => results.push(row))
          .on("end", () => resolve(results))
          .on("error", (err) => reject(err));
      });
    } else if (ext === ".xlsx") {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      contacts = XLSX.utils.sheet_to_json(sheet);
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    res.status(500).json({ error: "Failed to read contacts file", details: error.message });
  }
});

// PUT: Update a template by ID
router.put("/:id", async (req, res) => {
  try {
    const templateId = req.params.id;
    const template = await Template.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    const { templateName, timestamp, modifiedDate, status } = req.body;
    await template.update({
      templateName: templateName || template.templateName,
      timestamp: timestamp || template.timestamp,
      modifiedDate: modifiedDate || new Date(), // Update modified date on edit
      status: status || template.status,
    });

    res.status(200).json(template);
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ error: "Failed to update template", details: error.message });
  }
});

module.exports = router;