const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    Jobrole: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
        unique: true
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
        ref: "User"
    }
},
    { timestamps: true })
const Job = mongoose.model('job', jobSchema)
module.exports = Job
