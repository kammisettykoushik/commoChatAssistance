const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");

const CampaignScreen = sequelize.define("CampaignScreen", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  campaignName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  campaignFrom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sendDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  contactListFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  audioFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure slug is unique
    validate: { notEmpty: true },
  },
}, {
  timestamps: true, 
});

module.exports = CampaignScreen;
