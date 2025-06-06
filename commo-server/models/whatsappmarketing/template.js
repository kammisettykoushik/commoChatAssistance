const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config");
const slugify = require("slugify");  // Ensure you import slugify

const Template = sequelize.define("Template", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
  },
  templateName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure slug is unique
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
  contactsCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  automation: { // New field to store automation settings
    type: DataTypes.JSON, // Stores { isImmediately, immediatelyDate, scheduleDate, scheduleTime }
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  modifiedDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "templates",
  timestamps: false,

  hooks: {
    // Hook to generate the slug before creating a template
    beforeCreate: async (template) => {
      console.log("beforeCreate Hook Triggered");
      
      // Ensure templateName is available before slug creation
      if (!template.templateName) {
        throw new Error("Template name is required to generate a slug");
      }

      if (!template.slug) {
        // Generate the slug from templateName
        template.slug = slugify(template.templateName, { lower: true, strict: true });
        console.log(`Generated Slug: ${template.slug}`);

        // Check if the generated slug is unique, append a timestamp if not
        let existingTemplate = await Template.findOne({ where: { slug: template.slug } });
        if (existingTemplate) {
          template.slug = `${template.slug}-${Date.now()}`;
          console.log(`Slug already exists. Updated Slug: ${template.slug}`);
        }
      }
    },

    // Hook to ensure slug is unique before update (if needed)
    beforeUpdate: async (template) => {
      console.log("beforeUpdate Hook Triggered");

      if (!template.slug) {
        // Generate the slug from templateName
        template.slug = slugify(template.templateName, { lower: true, strict: true });
        console.log(`Generated Slug: ${template.slug}`);

        let existingTemplate = await Template.findOne({ where: { slug: template.slug } });
        if (existingTemplate) {
          template.slug = `${template.slug}-${Date.now()}`;
          console.log(`Slug already exists. Updated Slug: ${template.slug}`);
        }
      }
    }
  }
});

module.exports = Template;
