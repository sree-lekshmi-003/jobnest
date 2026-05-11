const user = require('../models/usermodel')
const CreateUser = async (req, res) => {
    const { name,
        email,
        password,
        role,
        phone } = req.body


    try {

        const newdata = await new user({
            name,
            email,
            password,
            role,
            phone

        })
        await newdata.save()
        res.status(200).json({ msg: "User Created success", data: newdata })
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" })
    }

}


// ----------------READ USERS-----------------------------------------

const GetUser = async (req, res) => {
    try {
        const users = await user.find().sort({ createdAt: -1 })
        res.status(200).json({ msg: "all post", data: posts })
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}
// ---------------UPDATE USERS----------------------------------------
const updatepost = async (req, res) => {
    try {
        const { id } = req.params
        const updatepost = await blog.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatepost) {
            res.json({ msg: "post not found" })
        }
        res.status(200).json({ msg: "Post updated successfuly", updatedata: updatepost })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}
const Deletepost = async (req, res) => {
    try {
        const { id } = req.params
        const deletepost = await blog.findByIdAndDelete(id)
        if (!deletepost) {
            res.status(404).json({ msg: "post not found" })
        }
        res.status(200).json({ msg: "post deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}
module.exports = { createBlog, getpost, updatepost, Deletepost }
