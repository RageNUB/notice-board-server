const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// 📌 Create a new activity
router.post('/', async (req, res) => {
    try {
        const activity = new Activity(req.body);
        const savedActivity = await activity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        // res.status(400).json({ error: err.message });
        console.error("Create activity error:", error);
        res.status(500).json({ message: "Failed to create new activity" });
    }
});

// 📌 Edit (update) an activity by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedActivity = await Activity.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         if (!updatedActivity) {
//             return res.status(404).json({ message: 'Activity not found' });
//         }
//         res.json(updatedActivity);
//     } catch (error) {
//         // res.status(500).json({ error: err.message });
//         console.error("Update activity error:", error);
//         res.status(500).json({ message: "Failed to update activity" });
//     }
// });

// 📌 Edit (update) an activity by ID
router.put("/:id", async (req, res) => {
    try {
        const { courseId, courseName, activity, activityDateTime } = req.body;
        const filter = { _id: new ObjectId(req.params.id) }
        const updatedActivity = {
            $set: {
                courseId: courseId,
                courseName: courseName,
                activity: activity,
                activityDateTime: activityDateTime,
            }
        }
        const newActivity = await Activity.findByIdAndUpdate(filter, updatedActivity, {new: true});
        if(!newActivity) return res.status(404).json({ message: 'Activity not found' });
        res.json(newActivity);
    } catch (error) {
        console.error("Update activity error:", error);
        res.status(500).json({ message: "Failed to update activity" });
    }
})

// 📌 Get upcoming activities (by time remaining)
router.get('/upcoming', async (req, res) => {
    try {
        const now = new Date();
        const upcomingActivities = await Activity.find({ activityDateTime: { $gte: now } })
            .sort({ activityDateTime: 1 });
        res.json(upcomingActivities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
