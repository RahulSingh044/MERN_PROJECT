const {Schema, model}= require('mongoose');
const { string } = require('zod');

const contactSchema = new Schema({
    username:{ type: String, required: true},
    email:{ type: String, required: true},
    message:{ type: String, required: true},
    timestamp:{ type: Date, default: Date.now}
})

module.exports = model('Contact', contactSchema);