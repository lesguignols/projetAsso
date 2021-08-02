const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reductionSchema = new Schema({
    name: String,
    active: Boolean,
    rate: Number,
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'product'
    }
}, { collection: 'reduction', versionKey: false });

const ReductionModel = mongoose.model('reduction', reductionSchema);
module.exports = ReductionModel;