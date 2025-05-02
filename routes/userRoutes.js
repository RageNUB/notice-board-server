const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyTokenAndRole = require("../middleware/verifyToken");

router.put("/updateRole/:id", async (req, res) => {
    try {
        const { role } = req.body;
        const filter = { _id: new ObjectId(req.params.id) }
        const updatedRole = {
            $set: {
                role: role,
            }
        }
        const user = await User.findByIdAndUpdate(filter, updatedRole, {new: true});
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error("Update user role error:", error);
        res.status(500).json({ message: "Failed to update user role" });
    }
})
router.put("/updateInfo/:id", async (req, res) => {
    try {
        const { section, batch } = req.body;
        const filter = { _id: new ObjectId(req.params.id) }
        const updatedInfo = {
            $set: {
                section: section,
                batch: batch,
            }
        }
        const user = await User.findByIdAndUpdate(filter, updatedInfo, {new: true});
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error("Update user info error:", error);
        res.status(500).json({ message: "Failed to update user info" });
    }
})

router.post("/", async (req, res) => {
    const { email, name, studentId, photoURL, } = req.body;

    try {
        const newUser = new User({
            email,
            name,
            studentId,
            photoURL,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({ message: "Failed to create new user" });
    }
});

router.get("/getRole/:email", async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({ email });
    console.log("User:" + user.role);
    res.json(user);
})

router.get("/", async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
});

module.exports = router;
