const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String }
}, { collection: 'provider', versionKey: false });

const ProviderModel = mongoose.model('provider', providerSchema);
module.exports = ProviderModel;