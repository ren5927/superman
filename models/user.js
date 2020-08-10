const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    },
    identity: {
        type: String,
        default: "tourist"
    }
})

const userModel = mongoose.model('user', userSchema, 'user');

module.exports = userModel;