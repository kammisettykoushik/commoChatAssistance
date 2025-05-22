const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");

const contactsms = sequelize.define("contactsms", {
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
  contactsUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sendDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  contactsCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("Launched", "Failed", "Processing"),
    allowNull: false,
    defaultValue: "Processing",
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = contactsms;
