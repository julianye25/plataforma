const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const pdfSchema =new Schema({
    originalname: { type: String, required: true },
    timestamp: { type: Date, default: Date.now}
})


module.exports = mongoose.model('Pdf', pdfSchema);