const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");
 
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure slug is unique
    validate: { notEmpty: true },
  },
  password: {
    type: DataTypes.STRING, //  Fixed
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING, //  Fixed
    allowNull: false,
    validate: {
      isNumeric: true, //  Ensures only numbers
      len: [10, 10] //  Ensures exactly 10 digits
    }
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"), // Enum for status
    defaultValue: "active", // Default status is active
    allowNull: false,
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW //  Fixed
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  
});
 
module.exports = User;