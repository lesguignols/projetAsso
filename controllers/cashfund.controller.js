const cashFundModel = require('../models/cashfund');
const cashModel = require('../models/cash');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    cashFundModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getByDate = async(req, res) => {
    if (req.body.date != "") {
        cashFundModel.find({ date: { "$gte": req.body.date, "$lte": req.body.date } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        });
    }
}

module.exports.getByPeriod = async(req, res) => {
    if (req.body.endDate != "") {
        cashFundModel.find({ date: { "$gte": req.body.startDate, "$lte": req.body.endDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        }).sort('-date');
    } else {
        cashFundModel.find({ date: { "$gte": req.body.startDate } }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        }).sort('-date');
    }
}

module.exports.getByMember = async(req, res) => {
    cashFundModel.find({ member: req.body.member }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByPeriodAndMember = async(req, res) => {
    if (req.body.endDate != "") {
        cashFundModel.find({ date: { "$gte": req.body.startDate, "$lte": req.body.endDate }, member: req.body.member }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    } else {
        cashFundModel.find({ date: { "$gte": req.body.startDate }, member: req.body.member }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    }
}

module.exports.getBySumGreater = async(req, res) => {
    cashFundModel.find({ sum: { "$gte": req.body.sum } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getBySumLess = async(req, res) => {
    cashFundModel.find({ sum: { "$lte": req.body.sum } }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getAll = async(req, res) => {
    cashFundModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.addCashFund = async(req, res) => {
    var sum = 0;
    if (req.body.fifty) {
        sum += req.body.fifty * 50;
    }
    if (req.body.twenty) {
        sum += req.body.twenty * 20;
    }
    if (req.body.ten) {
        sum += req.body.ten * 10;
    }
    if (req.body.five) {
        sum += req.body.five * 5;
    }
    if (req.body.two) {
        sum += req.body.two * 2;
    }
    if (req.body.one) {
        sum += req.body.one * 1;
    }
    if (req.body.fiftycents) {
        sum += req.body.fiftycents * 0.5;
    }
    if (req.body.twentycents) {
        sum += req.body.twentycents * 0.2;
    }
    if (req.body.tencents) {
        sum += req.body.tencents * 0.1;
    }
    if (req.body.fivecents) {
        sum += req.body.fivecents * 0.05;
    }
    if (req.body.twocents) {
        sum += req.body.twocents * 0.02;
    }
    if (req.body.onecents) {
        sum += req.body.onecents * 0.01;
    }
    sum = Number.parseFloat(sum).toFixed(2);
    let today = new Date();
    let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
    const newCashFund = new cashFundModel({
        date: date,
        member: req.body.member,
        sum: sum,
        fifty: req.body.fifty,
        twenty: req.body.twenty,
        ten: req.body.ten,
        five: req.body.five,
        two: req.body.two,
        one: req.body.one,
        fiftycents: req.body.fiftycents,
        twentycents: req.body.twentycents,
        tencents: req.body.tencents,
        fivecents: req.body.fivecents,
        twocents: req.body.twocents,
        onecents: req.body.onecents
    });

    //add cash
    var mounth = parseInt(today.getMonth() + 1);
    var day = parseInt(today.getDate() + 1);
    var year = today.getFullYear();
    //date du lendemain
    if ((mounth == 1 || mounth == 3 || mounth == 5 || mounth == 7 || mounth == 8 || mounth == 10) && day > 31) {
        mounth++;
        day = 1;
    } else if ((mounth == 4 || mounth == 6 || mounth == 9 || mounth == 11) && day > 30) {
        mounth++;
        day = 1;
    } else if (mounth == 2 && ((year % 4 == 0 && day > 29) || (year % 4 != 0 && day > 28))) {
        mounth++;
        day = 1;
    } else if (mounth == 12 && day > 31) {
        mounth = 1;
        day = 1;
        year++;
    }
    var dateCash = mounth + "-" + day + "-" + year;
    const newCash = new cashModel({
        date: dateCash,
        cash_amount: sum
    });
    await newCash.save();

    try {
        const cashFund = await newCashFund.save();
        return res.status(201).json(cashFund);
    } catch (err) {
        return res.status(400).send(err)
    }
}