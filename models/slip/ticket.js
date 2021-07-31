const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slipTicketSchema = new Schema({
    date: {
        type: String
    },
    member: {
        type: Schema.Types.ObjectId,
        ref: 'adherent',
        require: true
    },
    total_amount: {
        type: Number,
        default: 0
    },
    num_slip: {
        type: String
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
    }
}, { collection: 'slipTicket', versionKey: false });

const SlipTicketModel = mongoose.model('slipTicket', slipTicketSchema);
module.exports = SlipTicketModel;