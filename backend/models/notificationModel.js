const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    message: {
        type: String,
        required: true
    },

    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Notification', notificationSchema)