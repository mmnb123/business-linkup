const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        default: 'default_avatar.png'
    },
    role: {
        type: String,
        default: 'admin' // 'user', 'admin'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);