const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    name: String,
    address: String,
    phone: String,
    email: String
}, { collection: 'provider', versionKey: false });

module.exports = mongoose.model('Provider', providerSchema);