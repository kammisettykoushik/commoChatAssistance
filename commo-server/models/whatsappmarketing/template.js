const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");

const Template = sequelize.define("Template", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  templateName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  header: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mediaType: {
    type: DataTypes.ENUM("Image", "Video"),
    allowNull: false,
    defaultValue: "Image",
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { notEmpty: true },
  },
  footer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mediaShape: {
    type: DataTypes.ENUM("Square", "Round", "Oval", "Rounded", "Semi-border", "Diamond"),
    allowNull: false,
    defaultValue: "Square",
  },
  contactsUrl: {
    type: DataTypes.STRING,
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
  status: {
    type: DataTypes.ENUM("Draft", "Approved"),
    allowNull: false,
    defaultValue: "Draft",
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
  },
}, {
  tableName: "templates",
  timestamps: false,
});

module.exports = Template;