const SlipTicketModel = require('../../models/slip/ticket');
const CashModel = require('../../models/cash');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    SlipTicketModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getByDate = async(req, res) => {
    if (req.body.date != "") {
        SlipTicketModel.find({ date: { "$gte": req.body.date, "$lte": req.body.date } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getByPeriod = async(req, res) => {
    if (req.body.endDate != "") {
        SlipTicketModel.find({ date: { "$gte": req.body.startDate, "$lte": req.body.endDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    } else {
        SlipTicketModel.find({ date: { "$gte": req.body.startDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getByMember = async(req, res) => {
    SlipTicketModel.find({ member: req.body.member }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByTotalAmountGreater = async(req, res) => {
    SlipTicketModel.find({ total_amount: { "$gte": req.body.total_amount } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByTotalAmountLess = async(req, res) => {
    SlipTicketModel.find({ total_amount: { "$lte": req.body.total_amount } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByNumSlip = async(req, res) => {
    SlipTicketModel.find({ num_slip: req.body.num_slip }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getAll = async(req, res) => {
    SlipTicketModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.addSlipTicket = async(req, res) => {
    var total_amount = 0;
    if (req.body.fifty) {
        total_amount += req.body.fifty * 50;
    }
    if (req.body.twenty) {
        total_amount += req.body.twenty * 20;
    }
    if (req.body.ten) {
        total_amount += req.body.ten * 10;
    }
    if (req.body.five) {
        total_amount += req.body.five * 5;
    }
    total_amount = Number.parseFloat(total_amount).toFixed(2);
    let today = new Date();
    let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();

    const newSlipTicket = new SlipTicketModel({
        date: date,
        member: req.body.member,
        num_slip: req.body.num_slip,
        total_amount: total_amount,
        fifty: req.body.fifty,
        twenty: req.body.twenty,
        ten: req.body.ten,
        five: req.body.five
    });

    const cash = await CashModel.findOne({ date: date });
    await CashModel.findByIdAndUpdate(cash._id, { $set: { cash_amount: cash.cash_amount - total_amount } });

    try {
        const slipTicket = await newSlipTicket.save();
        return res.status(201).json(slipTicket);
    } catch (err) {
        return res.status(400).send(err)
    }
}