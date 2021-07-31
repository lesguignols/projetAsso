const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adherentSchema = new Schema({
    _id: mongoose.ObjectId,
    card: String,
    name: String,
    firstName: String,
    link_photo: String,
    email: String,
    price: {
        type: Schema.Types.ObjectId,
        ref: 'price'
    },
    training: {
        type: Schema.Types.ObjectId,
        ref: 'training'
    },
    active: Boolean,
    member: Boolean,
    code: Number,
    secret_code: Number,
    administrator: Boolean,
    superAdministrator: Boolean
}, { collection: 'adherent', versionKey: false });

module.exports = mongoose.model('Adherent', adherentSchema);