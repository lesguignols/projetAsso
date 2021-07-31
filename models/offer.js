const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    name: { type: String },
    description: { type: String },
    active: { type: Boolean },
    price: { type: Number },
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: { type: Number }
        }]
    },
    daily: { type: Boolean },
    members_exclusivity: { type: Boolean },
    startOffer: { type: String },
    endOffer: { type: String }
}, { collection: 'offer', versionKey: false });

const OfferModel = mongoose.model('offer', offerSchema);
module.exports = OfferModel;