const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    barcode: String,
    name: String,
    selling_price: Number
}, { collection: 'product', versionKey: false });

const ProductModel = mongoose.model('product', productSchema);
module.exports = ProductModel;