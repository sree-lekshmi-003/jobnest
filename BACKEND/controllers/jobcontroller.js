const Job = require('../models/jobmodel')

// ---------------------------------CREATE JOB------------------------------------

const CreateJob = async (req, res) => {

    // ROLE CHECK

    if (req.user.role !== "employer") {
        return res.status(403).json({
            msg: "Only employer can create jobs"
        })
    }
    // ------------------------------------------------------------------------------------

    const { jobRole,
        company,
        location,
        salary,
        description,
        jobtype
    } = req.body
    try {

        const newdata = await new Job({
            jobRole,
            company,
            location,
            salary,
            description,
            jobtype,
            employer: req.user.id
        })
        await newdata.save()
        res.status(200).json({ msg: "Job Created success", data: newdata })
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

// ---------------------------------------------READ JOBS-------------------------

const GetJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 })
        res.status(200).json({ msg: "All jobs", data: jobs })
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

// ----------------------------------------------UPDATE JOBS----------------------

const UpdateJobs = async (req, res) => {

    // ROLE CHECK
    if (req.user.role !== "employer") {

        return res.status(403).json({
            msg: "Only employer can update jobs"
        })
    }
// -----------------------------------------------------------------------------

    try {
        const { id } = req.params
        const updatejobs = await Job.findById(id)
        if (!updatejobs) {
            return res.json({ msg: "Job not found" })
        }

        // OWNER CHECK
        if (job.employer.toString() !== req.user.id) {

            return res.status(403).json({
                msg: "You can update only your jobs"
            })
        }
// ------------------------------------------------------------------------------------

        const updatejobs = await Job.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        // ---------------------------------------------------------------------------------
        res.status(200).json({ msg: "Job updated successfuly", updatejobs: updatejobs })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

// ----------------------------------------------DELETE JOBS----------------------

const DeleteJobs = async (req, res) => {

    // ROLE CHECK
    if (req.user.role !== "employer") {

        return res.status(403).json({
            msg: "Only employer can delete jobs"
        })
    }
    // ----------------------------------------------------------------------------

    try {
        const { id } = req.params
        const deletejobs = await Job.findById(id)
        if (!deletejobs) {
            res.status(404).json({ msg: "Job not found" })
        }

        // OWNER CHECK
        if (job.employer.toString() !== req.user.id) {

            return res.status(403).json({
                msg: "You can delete only your jobs"
            })
        }
        // -----------------------------------------
        await Job.findByIdAndDelete(id)

        res.status(200).json({ msg: "Job deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

module.exports = { CreateJob, GetJobs, UpdateJobs, DeleteJobs }
