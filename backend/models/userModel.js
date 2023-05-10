const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
}, { timestamps: true })

//static signup method
userSchema.statics.signup = async function (username, email, password) {
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw new Error('Email already is use')
    }   
    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        throw new Error('Username already is use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user

    
}

module.exports = mongoose.model('User', userSchema)