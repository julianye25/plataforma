const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const pdf = require('../controllers/pdf')

module.exports = app => {
    
    router.get('/', home.index);
    router.get('/pdf/descargar', pdf.descargar);
    router.post('/files', pdf.up);
    router.post('/pdfs', pdf.create);
    router.post('/pdfs2', pdf.create2);
    router.delete('/pdfs/pdf_id', pdf.remove);

    app.use(router);
}