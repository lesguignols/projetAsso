const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    _id: mongoose.ObjectId,
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
        type: [Schema.Types.ObjectId],
        ref: 'linesale'
    },
    price_tot: Number
}, { collection: 'sale', versionKey: false });

module.exports = mongoose.model('Sale', saleSchema);