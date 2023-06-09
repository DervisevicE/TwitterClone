const mongoose = require('mongoose')

const Schema = mongoose.Schema

const repostSchema = new Schema({
    tweet: {
        type: mongoose.Types.ObjectId,
        ref: 'Tweet',
        required:true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Repost', repostSchema)