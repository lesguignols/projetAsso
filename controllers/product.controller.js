const ProductModel = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAll = async(req, res) => {
    ProductModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    ProductModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getByBarcode = async(req, res) => {
    ProductModel.find({ barcode: req.body.barcode }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.addProduct = async(req, res) => {
    const newProduct = new ProductModel({
        barcode: req.body.barcode,
        name: req.body.name,
        selling_price: req.body.selling_price
    });

    try {
        const product = await newProduct.save();
        return res.status(201).json(product);
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updateBarcode = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await ProductModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    barcode: req.body.barcode,
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

module.exports.updateName = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await ProductModel.findByIdAndUpdate(req.params.id, {
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

module.exports.updateSellingPrice = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await ProductModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    selling_price: req.body.selling_price,
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