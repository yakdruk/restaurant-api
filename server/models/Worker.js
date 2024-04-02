const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true }
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
