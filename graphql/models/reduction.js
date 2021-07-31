const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reductionSchema = new Schema({
    _id: mongoose.ObjectId,
    name: String,
    active: Boolean,
    rate: Number,
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'product'
    }
}, { collection: 'reduction', versionKey: false });

module.exports = mongoose.model('Reduction', reductionSchema);