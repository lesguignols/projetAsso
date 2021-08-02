const CashModel = require('../models/cash');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    CashModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getAll = async(req, res) => {
    CashModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    }).sort("-date")
}

module.exports.addAmount = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        var add_amount = 0;
        if (req.body.fifty) {
            add_amount += req.body.fifty * 50;
        }
        if (req.body.twenty) {
            add_amount += req.body.twenty * 20;
        }
        if (req.body.ten) {
            add_amount += req.body.ten * 10;
        }
        if (req.body.five) {
            add_amount += req.body.five * 5;
        }
        if (req.body.two) {
            add_amount += req.body.two * 2;
        }
        if (req.body.one) {
            add_amount += req.body.one * 1;
        }
        if (req.body.fiftycents) {
            add_amount += req.body.fiftycents * 0.5;
        }
        if (req.body.twentycents) {
            add_amount += req.body.twentycents * 0.2;
        }
        if (req.body.tencents) {
            add_amount += req.body.tencents * 0.1;
        }
        if (req.body.fivecents) {
            add_amount += req.body.fivecents * 0.05;
        }
        if (req.body.twocents) {
            add_amount += req.body.twocents * 0.02;
        }
        if (req.body.onecents) {
            add_amount += req.body.onecents * 0.01;
        }
        const cash = await CashModel.findById(req.params.id);
        var newCashAmount = cash.cash_amount + add_amount;
        newCashAmount = Number.parseFloat(newCashAmount).toFixed(2);
        await CashModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    cash_amount: newCashAmount
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