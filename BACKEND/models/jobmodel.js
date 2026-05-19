const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobRole: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    jobtype: {
        type: String
    }, 
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Links the job to the Employer who created it
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;