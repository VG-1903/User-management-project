const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET all users
router.get('/getusers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// POST Register a new user
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: `User ${user.name} created successfully!` });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

// POST Authenticate user
router.post('/authenticate', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ message: "User Not Found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "Not Authorized" });

        res.status(200).json({ message: "Authorized" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// PUT Update user details
router.put('/updateuser', async (req, res) => {
    try {
        const { username, ...updates } = req.body;

        const user = await User.findOneAndUpdate({ username }, updates, { new: true });

        if (!user) return res.status(404).json({ message: "User Not Found" });

        res.status(200).json({ message: "User Updated Successfully", newUser: user });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// DELETE Delete user
router.delete('/deleteuser', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOneAndDelete({ username });

        if (!user) return res.status(404).json({ message: "User Not Found" });

        res.status(200).json({ message: "User Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

module.exports = router;
