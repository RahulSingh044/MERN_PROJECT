const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//? password hashing function
userSchema.pre('save', async function() {
    const user = this;

    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashedPassword;
    } catch (error) {
        next(error);
    }
})

//? json webtoken function 
userSchema.methods.generateToken = async function() {
    const user = this;
    try {
        return jwt.sign({
            userId: user._id.toString(),
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '2h' }
    )
    } catch (error) {
        next(error);
    }
}

const User = new mongoose.model("User", userSchema)

module.exports = User;