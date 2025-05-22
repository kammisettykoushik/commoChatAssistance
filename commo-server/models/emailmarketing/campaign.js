const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");

const Campaign = sequelize.define("Campaign", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  campaignName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  owners: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactsUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactsCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  },
  header: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  footer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  timestamp: { // Created/Updated date
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  modifiedDate: { // New field for last modified date
    type: DataTypes.DATE,
    allowNull: true,
  },
});
module.exports = Campaign;