const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // adjust path

// --- REGISTER NEW USER ---
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            passwordHash,
        });

        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.passwordHash;

        res.status(201).json({ message: 'User registered successfully.', data: userResponse });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user.' });
    }
});

// --- LOGIN USER ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email }).select('+passwordHash');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // OPTIONAL: generate JWT token here if needed
        const userResponse = user.toObject();
        delete userResponse.passwordHash;

        res.status(200).json({ message: 'Login successful.', data: userResponse });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed.' });
    }
});

module.exports = router;
