const User = require('../models/usermodel')
const Job = require('../models/jobmodel')
const Application = require('../models/applicationmodel')

// ----------------------GET ALL USERS--------------------------------

const GetUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.status(200).json({ msg: "All users", data: users })
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" })

    }
}

// ----------------------DELETE USERS-------------------------------------

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        await User.findByIdAndDelete(id)
        res.status(200).json({ msg: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

// --------------------------------GET ALL JOBS------------------------------
const GetAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("employer", "name email")
        res.status(200).json({ msg: "All jobs", data: jobs })
    } catch (error) {
        res.status(500).json({ msg: "server error" })
    }
}

//------------------------------- DELETE ANY JOB---------------------------

const DeleteAnyJob = async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.findById(id)
        if (!job) {
            return res.status(404).json({ msg: "Job not found" })
        }

        await Job.findByIdAndDelete(id)
        res.status(200).json({ msg: "Job deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: "server error" })
    }
}

// -----------------------------GET ALL APPLICATIONS-----------------------

const GetApplications=async(req,res)=>{
    try{
        const applications=await Application.find().populate("user","name email").populate("job","jobRole company")
        res.status(200).json({msg:"All applications"})
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
}

module.exports={GetUsers,DeleteUser,GetAllJobs,DeleteAnyJob,GetApplications}