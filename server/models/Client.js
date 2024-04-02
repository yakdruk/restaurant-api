const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
