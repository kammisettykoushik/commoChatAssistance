const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/config');
const userRoutes = require('./routes/whatsappmarketingroutes/userRoutes');
const contactRoutes = require('./routes/whatsappmarketingroutes/contactRoutes');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 3001;  // Make port configurable with .env


app.use(cors());
app.use(bodyParser.json());




//Whatsapp marketing url path starts here:-
app.use('/api/whatsappmarketing/users', userRoutes);
app.use('/api/whatsappmarketing/contacts', contactRoutes);



// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}).catch((err) => {
  console.error(`Unable to start the server:`, err);
});