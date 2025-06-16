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
const session = require('express-session');
const passport = require('./config/passport'); // Ensure this path is correct
// const adminRoutes = require('./routes/adminroutes/adminRoutes'); // Ensure this path is correct


require('dotenv').config();

const app = express()
const port = process.env.PORT || 3001;  // Make port configurable with .env
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
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
app.options('*', cors(corsOptions)); 
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

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'your_custom_token';

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});


// Admin routes
// app.use('/api/admin', adminRoutes);



//Whatsapp marketing url path starts here:-
app.use('/api/whatsappmarketing/contacts', contactRoutes);
app.use('/api/whatsappmarketing/templates', templateRoutes);
app.use('/api/emailmarketing/campaigns', campaignRoutes);
// app.use('/api/authentication/users', userRoutes);
app.use('/api/authentication', userRoutes);
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