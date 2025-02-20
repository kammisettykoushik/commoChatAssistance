// routes/whatsappmarketing/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../../models/whatsappmarketing/contact');

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create a new contact
router.post('/', async (req, res) => {
    try {
      const { name, phone } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
      }
      const contact = await Contact.create({ name, phone });
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // PUT update a contact
  router.put('/:id', async (req, res) => {
    try {
      const { name, phone } = req.body;
      const { id } = req.params;
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      await contact.update({ name, phone });
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE a contact
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      await contact.destroy();
      res.status(204).send(); // No content on successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
