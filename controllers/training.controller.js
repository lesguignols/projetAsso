const TrainingModel = require('../models/training');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAll = async(req, res) => {
    TrainingModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log(err)
    })
}

module.exports.getInfo = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }

    TrainingModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            res.status(401).send(`ID inconnu : ${req.params.id}`)
        }
    });
}

module.exports.getByCurriculum = async(req, res) => {
    console.log(req.body)
    TrainingModel.find({ curriculum: req.body.curriculum }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByWording = async(req, res) => {
    TrainingModel.find({ wording: req.body.wording }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByYear = async(req, res) => {
    TrainingModel.find({ year: req.body.year }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.getByCurriculumAndYear = async(req, res) => {
    TrainingModel.find({ curriculum: req.body.curriculum, year: req.body.year }, (err, docs) => {
        if (!err) res.send(docs);
        else res.status(401).send(err);
    })
}

module.exports.addTraining = async(req, res) => {
    if (req.body.curriculum == "Licence") {
        for (var i = 1; i <= 3; i++) {
            const newTraining = new TrainingModel({
                curriculum: req.body.curriculum,
                wording: req.body.wording,
                year: i
            });
            await newTraining.save();
        }
    } else if (req.body.curriculum == "Master") {
        for (var i = 1; i <= 2; i++) {
            const newTraining = new TrainingModel({
                curriculum: req.body.curriculum,
                wording: req.body.wording,
                year: i
            });
            await newTraining.save();
        }
    } else if (req.body.curriculum == "Doctorat") {
        for (var i = 1; i <= 3; i++) {
            const newTraining = new TrainingModel({
                curriculum: req.body.curriculum,
                wording: req.body.wording,
                year: i
            });
            await newTraining.save();
        }
    } else {
        const newTraining = new TrainingModel({
            curriculum: req.body.curriculum,
            wording: req.body.wording,
            year: 1
        });
        await newTraining.save();
    }


    try {
        TrainingModel.find({ curriculum: req.body.curriculum, wording: req.body.wording }, (err, docs) => {
            if (!err) res.send(docs);
            else res.status(401).send(err);
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updateCurriculum = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await TrainingModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    curriculum: req.body.curriculum,
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

module.exports.updateWording = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await TrainingModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    wording: req.body.wording,
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

module.exports.updateYear = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`"${req.params.id}" n'est pas un ID!`);
    }
    try {
        await TrainingModel.findByIdAndUpdate(req.params.id, {
                $set: {
                    year: req.body.year,
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