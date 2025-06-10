const axios = require('axios');
require('dotenv').config();

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const WhatsApp = async (recipientPhone, template) => {
  const url = `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: template.name, // Your approved template name
      language: { code: "en_US" },
      components: [],
    },
  };

  if (template.body && Array.isArray(template.body)) {
    payload.template.components.push({
      type: "body",
      parameters: template.body.map(text => ({ type: "text", text })),
    });
  }

  if (template.header && template.mediaUrl) {
    const mediaParam = {
      type: template.mediaType,
      [template.mediaType]: { link: template.mediaUrl },
    };

    payload.template.components.push({
      type: "header",
      parameters: [mediaParam],
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
    console.log("WhatsApp message sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("WhatsApp message error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = WhatsApp;