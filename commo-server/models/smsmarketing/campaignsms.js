const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");

const campaignsms = sequelize.define("campaignsms", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
  },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
    },
    phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 10],
        },
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = campaignsms;