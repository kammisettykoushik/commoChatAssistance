const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/config');
const contactRoutes = require('./routes/whatsappmarketingroutes/contactRoutes');
const templateRoutes = require('./routes/whatsappmarketingroutes/templateRoutes');
const campaignRoutes = require('./routes/emailmarketingroutes/campaignRoutes');
const userRoutes = require('./routes/authenticationroutes/userRoutes');
const campaignscreenRoutes = require('./routes/coldcallingroutes/campaignscreenRoutes');
const campaignsmsRoutes = require('./routes/smsmarketingroutes/campaignsmsRoutes');
const contactsmsRoutes = require('./routes/smsmarketingroutes/contactsmsRoutes');
const path = require('path');
const fs = require('fs');
const passport = require('./config/passport'); // adjust path
const session = require('express-session');
const socialAuthRoutes = require('./routes/authenticationroutes/socialAuthRoutes'); // adjust path

require('dotenv').config();

const app = express()
const port = process.env.PORT || 3001;  // Make port configurable with .env
app.use(session({ secret: process.env.SESSION_SECRET || 'your_session_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CLIENT_DOMAIN,
  credentials: true
}));

// app.use(cors());
// CORS configuration - move this ABOVE app.use(cors(...))
const corsOptions = {
  origin: [
    'http://localhost:3000', // React app running locally
    'https://www.trishokaconnect.com',
    'https://trishokaconnect.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true, // if you're using cookies or Authorization headers
};

// Apply middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to trishokaconnect internal API, Proceed at your own risk!');
});

// Serve static files from uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));


// ------------------- WhatsApp Webhook Routes -------------------
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'your_custom_token';

// Webhook verification endpoint (GET)
// const VERIFY_TOKEN = "your_token_here";

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});


// Webhook event receiver (POST)
app.post("/webhook", (req, res) => {
  console.log("Received webhook event:", JSON.stringify(req.body, null, 2));

  // Optional: handle incoming messages here
  // const entry = req.body.entry?.[0];
  // const changes = entry?.changes?.[0];
  // const message = changes?.value?.messages?.[0];

  res.sendStatus(200); // Acknowledge within 10 seconds
});

//Whatsapp marketing url path starts here:-
app.use('/api/whatsappmarketing/contacts', contactRoutes);
app.use('/api/whatsappmarketing/templates', templateRoutes);
app.use('/api/emailmarketing/campaigns', campaignRoutes);
// app.use('/api/authentication/users', userRoutes);
app.use('/api/authentication', userRoutes);
app.use('/api/authentication/social', socialAuthRoutes); // Social auth routes
app.use('/api/coldcallingmarketing/campaignscreens', campaignscreenRoutes);
app.use('/api/smsmarketing/campaignsms', campaignsmsRoutes);
app.use('/api/smsmarketing/contactsms', contactsmsRoutes);
// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});


// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong", details: err.message });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}).catch((err) => {
  console.error(`Unable to start the server:`, err);
});

// Below module resets the database use only if there is db issue
// sequelize.sync({ force: true }).then(() => {
//   app.listen(port, () => {
//     console.log(`Server is running on ${port}`);
//   });
// }).catch((err) => {
//   console.error(`Unable to start the server:`, err);
// });