const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    barcode: String,
    name: String,
    selling_price: Number
}, { collection: 'product', versionKey: false });

module.exports = mongoose.model('Product', productSchema);