const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productofferSchema = new Schema({
    _id: mongoose.ObjectId,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: Number
}, { collection: 'productOffer', versionKey: false });

module.exports = mongoose.model('ProductOffer', productofferSchema);