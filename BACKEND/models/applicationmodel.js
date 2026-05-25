const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", 
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"], 
        default: "Pending"
    }
}, { timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;