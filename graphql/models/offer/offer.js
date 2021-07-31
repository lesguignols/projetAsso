const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    _id: mongoose.ObjectId,
    name: String,
    active: Boolean,
    price: Number,
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'product'
    },
    daily: { type: Boolean },
    members_exclusivity: { type: Boolean },
    startOffer: String,
    endOffer: String
}, { collection: 'offer', versionKey: false });

module.exports = mongoose.model('Offer', offerSchema);