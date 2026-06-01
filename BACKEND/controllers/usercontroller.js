const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const saltrounds = 10;
const jwt = require('jsonwebtoken')

// ----------------------------REGISTER USER----------------------------------------------------
const registeruser = async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "User already exist" });
        }
        const hashedpassword = await bcrypt.hash(password, saltrounds);
        const userdata = new User({ name, email, password: hashedpassword, role });
        await userdata.save()
        res.status(201).json({ msg: "User created successfully", data: userdata })
    }
    catch (error) {
        res.status(500).json({ msg: "Server error", error })
    }
}

// ---------------------------------------LOGIN-------------------------------------------
const Login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ msg: "User not registered, please register" })
        }
        const matchpassword = await bcrypt.compare(password, user.password);
        if (!matchpassword) {
            return res.status(400).json({ msg: "Invalid credentials" })
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY || 'your_secret_key', { expiresIn: '1h' })
        res.status(200).json({
            msg: "Logged in successfully",
            token: token,
            role: user.role,
            userid: user._id,
            name: user.name

            
        })
    }
    catch (error) {
        return res.status(500).json({ msg: "Server error", error })
    }
}

//------------------------------------------GET PROFILE------------------------------------
const getprofile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
};

//------------------------------------------UPDATE PROFILE---------------------------------
const updateprofile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        const updateduser = await user.save();
        res.json(updateduser);
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
};

module.exports = { registeruser, Login, getprofile, updateprofile };