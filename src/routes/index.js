const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const pdf = require('../controllers/pdf')

module.exports = app => {
    
    router.get('/', home.index);
    router.get('/pdfs/pdf_id', pdf.index);
    router.post('/pdfs', pdf.create);
    router.delete('/pdfs/pdf_id', pdf.remove);

    app.use(router);
}