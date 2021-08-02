const InventorySupposedModel = require('../../models/inventory/inventory.supposed');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    InventorySupposedModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getAll = async(req, res) => {
    InventorySupposedModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    }).sort('-date');
}

module.exports.addInventorySupposed = async(req, res) => {

    let today = new Date();
    let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

    const newInventorySupposed = new InventorySupposedModel({
        date: date,
        products: req.body.products
    });

    try {
        const inventorySupposed = await newInventorySupposed.save();
        return res.status(201).json(inventorySupposed);
    } catch (err) {
        return res.status(400).send(err)
    }
}