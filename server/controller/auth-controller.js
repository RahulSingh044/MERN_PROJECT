
const User = require('../models/user-model')
const bcrypt = require('bcrypt')

const home = async (req, res) => {
    try {
        res.status(200).send("Hello world!");
    } catch (error) {
        console.log(error);
    }
}


const register = async (req, res, next) => {
    try {

        const { username, email, mobile, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ exist: true, msg: 'User already exists' });
        }

        const user = await User.create({
            username,
            email,
            mobile,
            password
        });

        res.status(200).json({ success: true, user: user, token: await user.generateToken(), userId: user._id.toString() });


    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist)
            res.status(400).json({ msg: 'Invalid Credentials' });

        const user = await bcrypt.compare(password, userExist.password)

        if (user) {
            res.status(200).json({ user: userExist, success: true, token: await userExist.generateToken(), userId: userExist._id.toString() });
        } else {
            res.status(401).json({ msg: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
}

const user = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.error(error);
    }
}

module.exports = { home, register, login, user }