const express = require('express');
const User = require('../../models/whatsappmarketing/user');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

router.toString('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error: error.message });
    }
});

module.exports = router;