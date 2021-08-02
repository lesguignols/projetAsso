const AdherentModel = require('..//models/adherent');
const PriceModel = require('..//models/price');
const TrainingModel = require('..//models/training');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const fs = require("fs");

module.exports.getInfo = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    AdherentModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    }).select('-code -secret_code');
}

module.exports.getByCard = (req, res) => {
    if (req.body.card.length != 13) {
        return res.status(400).send(`"${req.body.card}" n'est pas un numéro de carte!`);
    }

    AdherentModel.find({ card: req.body.card }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`Carte inconnu : ${req.body.card}`)
        }
    }).select('-code -secret_code');
}

module.exports.getByName = (req, res) => {
    if (req.body.name.length <= 3 || req.body.name.length >= 55) {
        return res.status(400).send(`"${req.body.name}" n'est pas un nom valide!`);
    }

    AdherentModel.find({ name: req.body.name }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`Nom inconnu : ${req.body.name}`)
        }
    }).select('-code -secret_code');
}

module.exports.getByFirstName = (req, res) => {
    if (req.body.firstName.length <= 3 && req.body.firstName.length >= 55) {
        return res.status(400).send(`"${req.body.firstName}" n'est pas un prénom valide!`);
    }

    AdherentModel.find({ firstName: req.body.firstName }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`Prénom inconnu : ${req.body.firstName}`)
        }
    }).select('-code -secret_code');
}

module.exports.getByPrice = (req, res) => {
    if (!ObjectId.isValid(req.body.price)) {
        return res.status(400).send(`"${req.body.price}" n'est pas un ID!`);
    }

    AdherentModel.find({ price: req.body.price }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID Tarif inconnu : ${req.body.id}`)
        }
    }).select('-code -secret_code');
}

module.exports.getByTraining = (req, res) => {
    if (!ObjectId.isValid(req.body.training)) {
        return res.status(400).send(`"${req.body.training}" n'est pas un ID!`);
    }

    AdherentModel.find({ training: req.body.training }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID Formation inconnu : ${req.body.training}`)
        }
    }).select('-code -secret_code');
}

module.exports.getByActive = (req, res) => {
    AdherentModel.find({ active: req.body.active }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send({ message: err })
        }
    }).select('-code -secret_code');
}

module.exports.getByMember = (req, res) => {
    AdherentModel.find({ member: req.body.member }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send({ message: err })
        }
    }).select('-code -secret_code');
}

module.exports.getByAdministrator = (req, res) => {
    AdherentModel.find({ administrator: req.body.administrator }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send({ message: err })
        }
    }).select('-code -secret_code');
}

module.exports.getBySuperAdministrator = (req, res) => {
    AdherentModel.find({ superAdministrator: req.body.superAdministrator }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send({ message: err })
        }
    }).select('-code -secret_code');
}

module.exports.getAll = async(req, res) => {
    const adherents = await AdherentModel.find({}).select('-code -secret_code');
    res.status(200).json(adherents);
}







module.exports.updateCard = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        if (req.body.card.length != 13) {
            return res.status(400).send(`"${req.body.card}" n'est pas un numéro de carte valide!`);
        } else {
            const adherent = await AdherentModel.findById(req.params.id).select('-code -secret_code');
            const fileName = adherent.card + ".png";
            const newName = req.body.card + ".png";

            fs.renameSync(`${__dirname}/../client/public/adherents/${fileName}`, `${__dirname}/../client/public/adherents/${newName}`)

            await AdherentModel.findByIdAndUpdate(req.params.id, {
                    $set: {
                        card: req.body.card,
                        link_photo: "./uploads/profil/" + newName,
                    }
                }, { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) return res.send(docs);
                    if (err) return res.status(500).send({ message: err });
                }
            ).select('-code -secret_code');
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateName = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        if (req.body.name.length >= 3 && req.body.name.length <= 55) {
            return res.status(400).send(`"${req.body.name}" n'est pas un nom valide!`);
        } else {
            await AdherentModel.findByIdAndUpdate(req.params.id, {
                    $set: {
                        name: req.body.name,
                    }
                }, { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) return res.send(docs);
                    if (err) return res.status(500).send({ message: err });
                }
            ).select('-code -secret_code');
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateFirstName = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        if (req.body.firstName.length >= 3 && req.body.firstName.length <= 55) {
            return res.status(400).send(`"${req.body.firstName}" n'est pas un prénom valide!`);
        } else {
            await AdherentModel.findByIdAndUpdate(req.params.id, {
                    $set: {
                        firstName: req.body.firstName,
                    }
                }, { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) return res.send(docs);
                    if (err) return res.status(500).send({ message: err });
                }
            ).select('-code -secret_code');
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateEmail = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        if (req.body.email == "") {
            return res.status(400).send(`"${req.body.email}" n'est pas un mail valide!`);
        } else {
            await AdherentModel.findByIdAndUpdate(req.params.id, {
                    $set: {
                        mail: req.body.mail,
                    }
                }, { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) return res.send(docs);
                    if (err) return res.status(500).send({ message: err });
                }
            ).select('-code -secret_code');
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updatePrice = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        if (!ObjectId.isValid(req.body.price)) {
            return res.status(400).send(`"${req.body.price}" n'est pas un ID valide!`);
        } else {
            var price = null;
            price = await PriceModel.findById(req.body.price);
            if (price == null) {
                return res.status(400).send(`"${req.body.price}" n'est pas un ID de Tarif!`);
            } else {
                await AdherentModel.findByIdAndUpdate(req.params.id, {
                        $set: {
                            price: req.body.price,
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true },
                    (err, docs) => {
                        if (!err) return res.send(docs);
                        if (err) return res.status(500).send({ message: err });
                    }
                ).select('-code -secret_code');
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateTraining = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        if (!ObjectId.isValid(req.body.training)) {
            return res.status(400).send(`"${req.body.training}" n'est pas un ID valide!`);
        } else {
            var training = null;
            training = await TrainingModel.findById(req.body.training);
            if (training == null) {
                return res.status(400).send(`"${req.body.training}" n'est pas un ID de Formation!`);
            } else {
                await AdherentModel.findByIdAndUpdate(req.params.id, {
                        $set: {
                            training: req.body.training,
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true },
                    (err, docs) => {
                        if (!err) return res.send(docs);
                        if (err) return res.status(500).send({ message: err });
                    }
                ).select('-code -secret_code');
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateActive = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await AdherentModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    active: req.body.active,
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        ).select('-code -secret_code');
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateMember = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await AdherentModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    member: req.body.member,
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        ).select('-code -secret_code');
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateCode = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        if (!Number.isInteger(req.body.code)) {
            return res.status(400).send(`"${req.body.code}" n'est pas un code valide!`);
        } else {
            var code = req.body.code.toString();
            const salt = await bcrypt.genSalt();
            code = await bcrypt.hash(code, salt);
            await AdherentModel.findByIdAndUpdate(req.params.id, {
                    $set: {
                        code: code,
                    }
                }, { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) return res.send(docs);
                    if (err) return res.status(500).send({ message: err });
                }
            ).select('-code -secret_code');
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateSecretCode = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        if (!Number.isInteger(req.body.code)) {
            return res.status(400).send(`"${req.body.secret_code}" n'est pas un code valide!`);
        } else {
            var secret_code = req.body.secret_code.toString();
            const salt = await bcrypt.genSalt();
            secret_code = await bcrypt.hash(secret_code, salt);
            await AdherentModel.findByIdAndUpdate(req.params.id, {
                    $set: {
                        secret_code: secret_code,
                    }
                }, { new: true, upsert: true, setDefaultsOnInsert: true },
                (err, docs) => {
                    if (!err) return res.send(docs);
                    if (err) return res.status(500).send({ message: err });
                }
            ).select('-code -secret_code');
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateAdministrator = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await AdherentModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    administrator: req.body.administrator,
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        ).select('-code -secret_code');
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateSuperAdministrator = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await AdherentModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    superAdministrator: req.body.superAdministrator,
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        ).select('-code -secret_code');
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}