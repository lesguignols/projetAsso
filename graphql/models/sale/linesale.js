const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linesaleSchema = new Schema({
    _id: mongoose.ObjectId,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: Number,
    sum: Number
}, { collection: 'linesale', versionKey: false });

module.exports = mongoose.model('LineSale', linesaleSchema);