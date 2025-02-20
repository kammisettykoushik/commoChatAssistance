const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    logging: false,
  });


// Test the connection to the database
const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  testConnection();
  
// Sync the database schema (with force: true to recreate the tables)
// Caution: This will drop the existing tables and recreate them, losing any data!
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database synced successfully.');
// }).catch(err => {
//   console.error('Error syncing the database:', err);
// });

  module.exports = sequelize;