const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    photo_directory: String,
    cash_register: Boolean,
    scan: Boolean
}, { collection: 'settings', versionKey: false });

module.exports = mongoose.model('Settings', settingsSchema);