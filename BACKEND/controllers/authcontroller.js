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
        const userdata = await new User({ name, email, password: hashedpassword, role });
        await userdata.save()
        res.status(201).json({ msg: "User created successully", data: userdata })
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
            return res.status(404).json({ msg: "User not registered,please register" })
        }
        const matchpassword = await bcrypt.compare(password, user.password);
        if (!matchpassword) {
            return res.status(404).json({ msg: "Invalid credentials" })
        }
        const token = jwt.sign({ id: user.id, role: user.role }, processZ.env.SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ msg: "Loggedin successfully", token: token })
    }
    catch (error) {
        return res.status(500).json({ msg: "Server error", error })
        console.log(error);

    }
}
module.exports = { registeruser, Login }