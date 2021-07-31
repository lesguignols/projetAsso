const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slipTicketSchema = new Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true
    },
    date: String,
    member: {
        type: Schema.Types.ObjectId,
        ref: 'adherent'
    },
    total_amount: {
        type: Number,
        default: 0
    },
    num_slip: String,
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
    }
}, { collection: 'slipTicket', versionKey: false });

module.exports = mongoose.model('SlipTicket', slipTicketSchema);