const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    descript: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    expend: {
        type: Number,
        required: true
    },
    cash: {
        type: Number,
        required: true
    },
    remark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String
    }
})

const profileModel = mongoose.model('profile', profileSchema, 'profile');

module.exports = profileModel;