const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");
const Template = require("./template");

const Broadcast = sequelize.define("Broadcast", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  templateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Templates", key: "id" },
  },
  contactsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("Processing", "Sending", "Sent", "Delivered", "Read", "Replied", "Failed"),
    allowNull: false,
    defaultValue: "Processing",
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  broadcastDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "broadcasts",
  timestamps: false,
});

// Define association
Broadcast.belongsTo(Template, { foreignKey: "templateId" });
Template.hasMany(Broadcast, { foreignKey: "templateId" });

module.exports = Broadcast;