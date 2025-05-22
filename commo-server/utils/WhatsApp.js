const axios = require('axios');
require('dotenv').config();

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const WhatsApp = async (recipientPhone, template) => {
  const url = `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: "hello_world", // Your approved template name
      language: { code: "en_US" },
      components: [],
    },
  };

  if (template.body) {
    payload.template.components.push({
      type: "body",
      parameters: [
        { type: "text", text: template.body },
      ],
    });
  }

  if (template.header && template.mediaUrl) {
    payload.template.components.push({
      type: "header",
      parameters: [
        {
          type: template.mediaType === "image" ? "image" : "document", // Or video etc.
          image: template.mediaType === "image" ? { link: template.mediaUrl } : undefined,
          document: template.mediaType !== "image" ? { link: template.mediaUrl } : undefined,
        },
      ],
    });
  } else if (template.header) {
    payload.template.components.push({
      type: "header",
      parameters: [
        { type: "text", text: template.header },
      ],
    });
  }

  if (template.footer) {
    payload.template.components.push({
      type: "footer",
      parameters: [
        { type: "text", text: template.footer },
      ],
    });
  }

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("✅ WhatsApp message sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ WhatsApp message error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = WhatsApp;
