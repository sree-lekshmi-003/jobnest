const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Links to the candidate applying
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", // Links to the specific job listing
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"], // Application workflow statuses
        default: "Pending"
    }
}, { timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;