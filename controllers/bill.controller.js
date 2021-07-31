const BillModel = require('../models/bill');
const InventorySupposedModel = require('../models/inventory/inventory.supposed');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    BillModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getByMember = async(req, res) => {
    BillModel.find({ member: req.body.member }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByDate = async(req, res) => {
    if (req.body.date != "") {
        BillModel.find({ date: { "$gte": req.body.date, "$lte": req.body.date } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getByPeriod = async(req, res) => {
    if (req.body.endDate != "") {
        BillModel.find({ date: { "$gte": req.body.startDate, "$lte": req.body.endDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    } else {
        BillModel.find({ date: { "$gte": req.body.startDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getByPriceGreater = async(req, res) => {
    BillModel.find({ price_tot: { "$gte": req.body.price_tot } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByPriceLess = async(req, res) => {
    BillModel.find({ price_tot: { "$lte": req.body.price_tot } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getAll = async(req, res) => {
    BillModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.addBill = async(req, res) => {
    var price_tot = 0;

    if (req.body.products) {
        const productArray = JSON.parse(JSON.stringify(req.body.products));
        var i = 0;

        while (i < productArray.length) {
            price_tot += productArray[i].price_line;
            await InventorySupposedModel.bill(productArray[i].product, productArray[i].quantity);
            i++;
        }
    }

    let today = new Date();
    let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

    const newBill = new BillModel({
        member: req.body.member,
        date: date,
        provider: req.body.provider,
        products: req.body.products,
        price_tot: price_tot
    });

    try {
        const bill = await newBill.save();
        return res.status(201).json(bill);
    } catch (err) {
        return res.status(400).send(err)
    }
}