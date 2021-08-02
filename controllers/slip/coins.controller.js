const SlipCoinsModel = require('../../models/slip/coins');
const CashModel = require('../../models/cash');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    SlipCoinsModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getByDate = async(req, res) => {
    if (req.body.date != "") {
        SlipCoinsModel.find({ date: { "$gte": req.body.date, "$lte": req.body.date } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getByPeriod = async(req, res) => {
    if (req.body.endDate != "") {
        SlipCoinsModel.find({ date: { "$gte": req.body.startDate, "$lte": req.body.endDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    } else {
        SlipCoinsModel.find({ date: { "$gte": req.body.startDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getByMember = async(req, res) => {
    SlipCoinsModel.find({ member: req.body.member }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByTotalAmountGreater = async(req, res) => {
    SlipCoinsModel.find({ total_amount: { "$gte": req.body.total_amount } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByTotalAmountLess = async(req, res) => {
    SlipCoinsModel.find({ total_amount: { "$lte": req.body.total_amount } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByNumSlip = async(req, res) => {
    SlipCoinsModel.find({ num_slip: req.body.num_slip }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getAll = async(req, res) => {
    SlipCoinsModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.addSlipCoins = async(req, res) => {
    var total_amount = 0;
    if (req.body.two) {
        total_amount += req.body.two * 2;
    }
    if (req.body.one) {
        total_amount += req.body.one * 1;
    }
    if (req.body.fiftycents) {
        total_amount += req.body.fiftycents * 0.5;
    }
    if (req.body.twentycents) {
        total_amount += req.body.twentycents * 0.2;
    }
    if (req.body.tencents) {
        total_amount += req.body.tencents * 0.1;
    }
    if (req.body.fivecents) {
        total_amount += req.body.fivecents * 0.05;
    }
    if (req.body.twocents) {
        total_amount += req.body.twocents * 0.02;
    }
    if (req.body.onecents) {
        total_amount += req.body.onecents * 0.01;
    }
    total_amount = Number.parseFloat(total_amount).toFixed(2);
    let today = new Date();
    let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

    const newSlipCoins = new SlipCoinsModel({
        date: date,
        member: req.body.member,
        num_slip: req.body.num_slip,
        total_amount: total_amount,
        two: req.body.two,
        one: req.body.one,
        fiftycents: req.body.fiftycents,
        twentycents: req.body.twentycents,
        tencents: req.body.tencents,
        fivecents: req.body.fivecents,
        twocents: req.body.twocents,
        onecents: req.body.onecents
    });

    const cash = await CashModel.findOne({ date: date });
    await CashModel.findByIdAndUpdate(cash._id, { $set: { cash_amount: cash.cash_amount - total_amount } });

    try {
        const slipCoins = await newSlipCoins.save();
        return res.status(201).json(slipCoins);
    } catch (err) {
        return res.status(400).send(err)
    }
}