const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    curriculum: { type: String },
    wording: { type: String },
    year: { type: Number }
}, { collection: 'training', versionKey: false });

const TrainingModel = mongoose.model('training', trainingSchema);
module.exports = TrainingModel;