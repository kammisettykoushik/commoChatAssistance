const express = require('express');
const router = express.Router();
const Campaign = require('../../models/emailmarketing/campaign');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse'); // Import Papa Parse
const { parseEmailContactsFile } = require('../../utils/parseEmailContacts');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/emailmarketing/campaigns');
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
  const allowedTypes = file.fieldname === 'file' ? ['.csv', '.xlsx'] : ['.jpg', '.jpeg', '.png'];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error(`Only ${allowedTypes.join(', ')} files are allowed for ${file.fieldname}`), false);
  }
};

const upload = multer({ storage, fileFilter });

// POST: Create a new campaign
router.post('/', upload.fields([{ name: 'image' }, { name: 'file' }]), async (req, res) => {
  const imageFile = req.files['image'] ? req.files['image'][0] : null;
  const contactsFile = req.files['file'] ? req.files['file'][0] : null;
  const imageUrl = imageFile ? `/uploads/emailmarketing/campaigns/${imageFile.filename}` : null;
  const contactsUrl = contactsFile ? `/uploads/emailmarketing/campaigns/${contactsFile.filename}` : null;

  const cleanupFiles = () => {
    if (imageFile && fs.existsSync(imageFile.path)) fs.unlinkSync(imageFile.path);
    if (contactsFile && fs.existsSync(contactsFile.path)) fs.unlinkSync(contactsFile.path);
  };

  try {
    const { name, Contact, tags, owners, subject, content, headers, footer } = req.body;
    let contactsCount = 0;

    if (contactsFile) {
      try {
        const contactsData = await parseEmailContactsFile(contactsFile.path);
        contactsCount = contactsData.length;
      } catch (error) {
        cleanupFiles();
        return res.status(400).json({ error: error.message });
      }
    }

    const newCampaign = await Campaign.create({
      campaignName: name,
      owners,
      tags,
      subject,
      mediaUrl: imageUrl,
      contactsUrl,
      content,
      header: headers,
      footer,
      timestamp: new Date(),
      contactsCount,
      status: 'Draft',
    });

    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    cleanupFiles();
    res.status(500).json({ error: 'Error creating campaign: ' + error.message });
  }
});

// GET: Fetch all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch contacts for a campaign
router.get('/:id/contacts', async (req, res) => {
  try {
    const campaignId = req.params.id;
    const campaign = await Campaign.findByPk(campaignId);
    if (!campaign || !campaign.contactsUrl) {
      return res.status(404).json({ error: 'Campaign or contacts file not found' });
    }

    const filePath = path.join(__dirname, '../../', campaign.contactsUrl);
    const contactsData = await parseEmailContactsFile(filePath);
    res.status(200).json(contactsData);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    res.status(500).json({ error: 'Failed to read contacts file', details: error.message });
  }
});

// PUT: Update a campaign
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const { campaignName, owners, tags, subject, mediaUrl, contactsUrl, content, header, footer, status } = req.body;
    await campaign.update({
      campaignName: campaignName || campaign.campaignName,
      owners: owners || campaign.owners,
      tags: tags || campaign.tags,
      subject: subject || campaign.subject,
      mediaUrl: mediaUrl || campaign.mediaUrl,
      contactsUrl: contactsUrl || campaign.contactsUrl,
      content: content || campaign.content,
      header: header || campaign.header,
      footer: footer || campaign.footer,
      status: status || campaign.status,
      modifiedDate: new Date(), // Add modified date on update
    });

    res.status(200).json(campaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: error.message });
  }
});


// PUT: Update contacts for a campaign
router.put('/:id/contacts', async (req, res) => {
  try {
    const { id } = req.params;
    const { contacts } = req.body;

    // Find the campaign
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Update the contacts file
    if (campaign.contactsUrl) {
      const filePath = path.join(__dirname, '../../', campaign.contactsUrl);
      const csvData = Papa.unparse(contacts); // Convert contacts array to CSV
      await fs.promises.writeFile(filePath, csvData); // Write updated CSV to file
    }

    res.status(200).json({ message: 'Contacts updated successfully' });
  } catch (error) {
    console.error('Error updating contacts:', error);
    res.status(500).json({ error: 'Failed to update contacts', details: error.message });
  }
});

// DELETE: Delete a campaign
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    if (campaign.mediaUrl && fs.existsSync(path.join(__dirname, '../../', campaign.mediaUrl))) {
      fs.unlinkSync(path.join(__dirname, '../../', campaign.mediaUrl));
    }
    if (campaign.contactsUrl && fs.existsSync(path.join(__dirname, '../../', campaign.contactsUrl))) {
      fs.unlinkSync(path.join(__dirname, '../../', campaign.contactsUrl));
    }

    await campaign.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;