const { Schema, model } = require('mongoose');

const serviceSchema = new Schema({
    services: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true }
})

module.exports = model('Service', serviceSchema);