const ProviderModel = require('../models/provider');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAll = async(req, res) => {
    ProviderModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    ProviderModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getByName = async(req, res) => {
    ProviderModel.find({ name: req.body.name }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.addProvider = async(req, res) => {
    const newProvider = new ProviderModel({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email
    });

    try {
        const provider = await newProvider.save();
        return res.status(201).json(provider);
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updateName = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await ProviderModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    name: req.body.name,
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

module.exports.updateAddress = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await ProviderModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    address: req.body.address,
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

module.exports.updatePhone = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await ProviderModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    phone: req.body.phone,
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

module.exports.updateEmail = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await ProviderModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    email: req.body.email,
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