const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    activity: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    activityDateTime: { type: Date, required: true },
    facultyName: { type: String, required: true },
    section: { type: String, required: true },
});

module.exports = mongoose.model('Activity', activitySchema);
