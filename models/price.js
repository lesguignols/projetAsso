const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    active: { type: Boolean }
}, { collection: 'price', versionKey: false });

const PriceModel = mongoose.model('price', priceSchema);
module.exports = PriceModel;