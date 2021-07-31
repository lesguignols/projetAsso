const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linebillSchema = new Schema({
    _id: mongoose.ObjectId,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: Number,
    price_unit: Number,
    tva: Number,
    price_line: Number
}, { collection: 'linebill', versionKey: false });

module.exports = mongoose.model('LineBill', linebillSchema);