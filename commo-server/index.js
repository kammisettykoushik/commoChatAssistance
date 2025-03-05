const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/config');
const userRoutes = require('./routes/whatsappmarketingroutes/userRoutes');
const contactRoutes = require('./routes/whatsappmarketingroutes/contactRoutes');
const templateRoutes = require('./routes/whatsappmarketingroutes/templateRoutes');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 3001;  // Make port configurable with .env


app.use(cors());
app.use(bodyParser.json());

// Serve static files from uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));


//Whatsapp marketing url path starts here:-
app.use('/api/whatsappmarketing/users', userRoutes);
app.use('/api/whatsappmarketing/contacts', contactRoutes);
app.use('/api/whatsappmarketing/templates', templateRoutes);



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