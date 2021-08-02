const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'adherent',
        require: true
    },
    date: { type: String },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'provider',
        require: true
    },
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: { type: Number },
            price_unit: { type: Number },
            tva: { type: Number },
            price_line: { type: Number }
        }]
    },
    price_tot: {
        type: Number
    }
}, { collection: 'bill', versionKey: false });

const BillModel = mongoose.model('bill', billSchema);
module.exports = BillModel;