const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cashFundSchema = new Schema({
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
    sum: {
        type: Number,
        default: 0
    },
    fifty: {
        type: Number,
        default: 0
    },
    twenty: {
        type: Number,
        default: 0
    },
    ten: {
        type: Number,
        default: 0
    },
    five: {
        type: Number,
        default: 0
    },
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
}, { collection: 'cashFund', versionKey: false });

module.exports = mongoose.model('CashFund', cashFundSchema);