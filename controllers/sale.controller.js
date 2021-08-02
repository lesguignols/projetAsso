const SaleModel = require('../models/sale');
const OfferModel = require('../models/offer');
const InventorySupposedModel = require('../models/inventory/inventory.supposed');
const CashModel = require('../models/cash');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    SaleModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getBySeller = async(req, res) => {
    SaleModel.find({ seller: req.body.seller }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByBuyer = async(req, res) => {
    SaleModel.find({ buyer: req.body.buyer }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByDate = async(req, res) => {
    if (req.body.date != "") {
        SaleModel.find({ date: { "$gte": req.body.date, "$lte": req.body.date } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getByPeriod = async(req, res) => {
    if (req.body.endDate != "") {
        SaleModel.find({ date: { "$gte": req.body.startDate, "$lte": req.body.endDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    } else {
        SaleModel.find({ date: { "$gte": req.body.startDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getByPriceGreater = async(req, res) => {
    SaleModel.find({ price_tot: { "$gte": req.body.price_tot } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByPriceLess = async(req, res) => {
    SaleModel.find({ price_tot: { "$lte": req.body.price_tot } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getAll = async(req, res) => {
    SaleModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.addSale = async(req, res) => {

    let today = new Date();
    let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

    var i = 0;
    var price_tot = 0;
    if (req.body.products) {
        const productsArray = JSON.parse(JSON.stringify(req.body.products));
        while (i < productsArray.length) {
            price_tot += productsArray[i].sum;
            await InventorySupposedModel.sale(productsArray[i].product, productsArray[i].quantity);
            i++;
        }
    }

    i = 0;
    if (req.body.offers) {
        const offersArray = JSON.parse(JSON.stringify(req.body.offers));
        while (i < offersArray.length) {
            const offer = await OfferModel.findById(offersArray[i]);
            price_tot += offer.price;
            const productsOfferArray = offer.products;
            var j = 0;
            while (j < productsOfferArray.length) {
                await InventorySupposedModel.sale(productsOfferArray[j].product.toString(), productsOfferArray[j].quantity);
                j++;
            }
            i++;
        }
    }

    const newAmount = price_tot;
    price_tot = Number.parseFloat(price_tot).toFixed(2);

    const newSale = new SaleModel({
        seller: req.body.seller,
        buyer: req.body.buyer,
        date: date,
        products: req.body.products,
        offers: req.body.offers,
        price_tot: price_tot
    });

    const cash = await CashModel.findOne({ date: date });
    var newCashAmount = cash.cash_amount + newAmount;
    newCashAmount = Number.parseFloat(newCashAmount).toFixed(2);
    console.log(newCashAmount)
    await CashModel.findByIdAndUpdate(cash._id, { $set: { cash_amount: newCashAmount } });

    try {
        const sale = await newSale.save();
        return res.status(201).json(sale);
    } catch (err) {
        return res.status(400).send(err)
    }
}