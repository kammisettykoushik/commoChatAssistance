// routes/campaignRoutes.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Campaign = require('../../models/coldcallingmarketing/campaignscreens');
const slugify = require('slugify'); // Import slugify library for creating slugs
const xlsx = require('xlsx');
const authenticate = require('../../middlewares/authenticate');
// const twilio = require('twilio');

// Twilio config
// const accountSid = 'AC4c5309e35c5bf5ba1cd458d5721c0712';
// const authToken = 'af17271e6cd1b67fedeb9627d196622b';
// const twilioClient = twilio(accountSid, authToken);
// const TWILIO_NUMBER = '+19206894945';

const router = express.Router();

// Make sure uploads folder exists
const uploadDir = 'uploads/coldcallingmarketing';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/coldcallingmarketing/campaignscreens
router.post(
  '/', authenticate ,
  upload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'contactListFile', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { campaignName, campaignFrom, sendDate } = req.body;
      const audioFile = req.files.audioFile[0].filename;
      const contactListFile = req.files.contactListFile[0].filename;

      if (
        !campaignName ||
        !campaignFrom ||
        !sendDate ||
        !req.files.audioFile ||
        !req.files.contactListFile
      ) {
        return res.status(400).json({ message: 'Missing required fields or files.' });
      }

      // Generate the slug from campaignName
      const slug = slugify(campaignName, { lower: true, strict: true  });
      const workbook = xlsx.readFile(path.join(uploadDir, contactListFile));
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const contacts = xlsx.utils.sheet_to_json(sheet);

      const phoneNumbers = contacts.map(c => c.Phone || c.phone || c.Mobile || c.mobile).filter(Boolean);

      const callResults = await Promise.all(phoneNumbers.map(number =>
        twilioClient.calls.create({
          to: number,
          from: TWILIO_NUMBER,
          url: `https://745e-2406-b400-d5-7e22-180d-8333-95cc-526f.ngrok-free.app/api/coldcallingmarketing/campaignscreens/twiml/${audioFile}`
        })
      ));

            // Save to DB via Sequelize
            const newCampaign = await Campaign.create({
              campaignName,
              campaignFrom,
              sendDate,
              slug,  // Save the slug
              audioFile,
              contactListFile,
              userId: req.user.id, // Assuming user ID is available in req.user
            });
    

      res.status(201).json({
        message: 'Campaign created successfully',
        campaign: newCampaign,
        callResults,
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
);

router.get('/', authenticate, async (req, res) => {
  try {
    const campaigns = await Campaign.findAll(
      {
      where: { id, userId: req.user.id } // <-- Only fetch user's campaigns
    }
    );
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve TwiML that plays uploaded audio file
router.get('/twiml/:audioFile', authenticate, (req, res) => {
  const { audioFile } = req.params;
  const audioUrl = `https://745e-2406-b400-d5-7e22-180d-8333-95cc-526f.ngrok-free.app/api/coldcallingmarketing/campaignscreens/twiml/${audioFile}`; // Use ngrok in production

  const twiml = `
    <Response>
      <Play>${audioUrl}</Play>
    </Response>
  `;

  res.type('text/xml');
  res.send(twiml);
});


module.exports = router;
