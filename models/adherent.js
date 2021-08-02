const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adherentSchema = new mongoose.Schema({
    card: {
        type: String,
        required: true,
        length: 13,
        unique: true
    },
    name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 55
    },
    firstName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 55
    },
    link_photo: {
        type: String
    },
    email: {
        type: String
    },
    price: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'price'
    },
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'training'
    },
    active: {
        type: Boolean
    },
    member: {
        type: Boolean
    },
    code: {
        type: String
    },
    secret_code: {
        type: String
    },
    administrator: {
        type: Boolean
    },
    superAdministrator: {
        type: Boolean
    }
}, { collection: 'adherent', versionKey: false });

/* //Permet de crypter le code et le secret_code avant enregistrement dans DB
adherentSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    if (this.code != null) {
        this.code = await bcrypt.hash(this.code, salt);
    }
    if (this.secret_code != null) {
        this.secret_code = await bcrypt.hash(this.secret_code, salt);
    }
    next();
}); */

adherentSchema.statics.login = async function(card, code) {
    const adherent = await this.findOne({ card }).select('-secret_code');
    if (adherent) {
        const auth = await bcrypt.compare(code, adherent.code);
        if (auth) {
            return adherent;
        } else {
            res.status(401).send(`Code invalide!`)
        }
    } else {
        res.status(401).send(`Carte invalide!`)
    }
};

const AdherentModel = mongoose.model('adherent', adherentSchema);
module.exports = AdherentModel;