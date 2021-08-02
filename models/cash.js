const mongoose = require('mongoose');

const cashSchema = new mongoose.Schema({
    date: { type: String },
    cash_amount: { type: Number }
}, { collection: 'cash', versionKey: false });

const CashModel = mongoose.model('cash', cashSchema);
module.exports = CashModel;