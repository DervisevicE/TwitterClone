const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tweetSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    comments: {
        type: Number,
        required: true
    },
    reposts: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Tweet', tweetSchema)