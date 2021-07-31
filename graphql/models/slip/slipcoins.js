const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slipCoinsSchema = new Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true
    },
    date: {
        type: String
    },
    member: {
        type: Schema.Types.ObjectId,
        ref: 'adherent'
    },
    total_amount: {
        type: Number,
        default: 0
    },
    num_slip: String,
    two: {
        type: Number,
        default: 0
    },
    one: {
        type: Number,
        default: 0
    },
    fiftycents: {
        type: Number,
        default: 0
    },
    twentycents: {
        type: Number,
        default: 0
    },
    tencents: {
        type: Number,
        default: 0
    },
    fivecents: {
        type: Number,
        default: 0
    },
    twocents: {
        type: Number,
        default: 0
    },
    onecents: {
        type: Number,
        default: 0
    }
}, { collection: 'slipCoins', versionKey: false });

module.exports = mongoose.model('SlipCoins', slipCoinsSchema);