const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/whatsappmarketingroutes/userRoutes');
const sequelize = require('./config/config');

require('dotenv').config();

const app = express()
const port = 3001;


app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);


sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}).catch((err) => {
  console.error(`Unable to start the server:`, err);
});