const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tweet: {
        type: mongoose.Types.ObjectId,
        ref: 'Tweet',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)