const SettingsModel = require('../models/settings');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    SettingsModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getAll = async(req, res) => {
    SettingsModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.addSettings = async(req, res) => {
    const newSettings = new SettingsModel({
        photo_directory: req.body.photo_directory,
        cash_register: req.body.cash_register,
        scan: req.body.scan
    });

    try {
        const settings = await newSettings.save();
        return res.status(201).json(settings);
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updatePhotoDirectory = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await SettingsModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    photo_directory: req.body.photo_directory,
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateCashRegister = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await SettingsModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    cash_register: req.body.cash_register,
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.updateScan = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await SettingsModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    scan: req.body.scan,
                }
            }, { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}