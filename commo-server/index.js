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


require('dotenv').config();

const app = express()
const port = process.env.PORT || 3001;  // Make port configurable with .env


// CORS configuration - move this ABOVE app.use(cors(...))
const corsOptions = {
  origin: [
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