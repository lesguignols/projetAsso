const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    barcode: String,
    name: String,
    selling_price: Number,
    type: String
}, { collection: 'product', versionKey: false });

const ProductModel = mongoose.model('product', productSchema);
module.exports = ProductModel;