const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const pdfSchema =new Schema({
    filename: { type: String },
    timestamp: { type: Date, default: Date.now}
})

pdfSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename), '')
    })

module.exports = mongoose.model('Pdf', pdfSchema);