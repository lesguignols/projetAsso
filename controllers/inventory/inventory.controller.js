const InventoryModel = require('../../models/inventory/inventory');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    InventoryModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getAll = async(req, res) => {
    InventoryModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    }).sort('-date');
}

module.exports.addInventory = async(req, res) => {

    let today = new Date();
    let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

    const newInventory = new InventoryModel({
        member: req.body.member,
        date: date,
        products: req.body.products
    });

    try {
        const inventory = await newInventory.save();
        return res.status(201).json(inventory);
    } catch (err) {
        return res.status(400).send(err)
    }
}