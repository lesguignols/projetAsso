const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'adherent',
        require: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'adherent'
    },
    date: String,
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: Number,
            sum: Number
        }]
    },
    offers: {
        type: [Schema.Types.ObjectId]
    },
    price_tot: Number
}, { collection: 'sale', versionKey: false });

const SaleModel = mongoose.model('sale', saleSchema);
module.exports = SaleModel;