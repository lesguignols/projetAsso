const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'adherent',
        require: true
    },
    date: String,
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'provider',
        require: true
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'linebill',
        require: true
    },
    price_tot: {
        type: Number,
        require: true
    }
}, { collection: 'bill', versionKey: false });

module.exports = mongoose.model('Bill', billSchema);