const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    photo_directory: String,
    cash_register: Boolean,
    scan: Boolean
}, { collection: 'settings', versionKey: false });

const SettingsModel = mongoose.model('Settings', settingsSchema);
module.exports = SettingsModel;