const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const favicon = require('serve-favicon')

const routes = require('../routes/index');
const errorHandler = require('errorhandler');
const { TIMEOUT } = require('dns');

module.exports = app => {
    // CORS
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', "POST, GET, PUT, DELETE, OPTIONS");
        res.header(timeout = 4, max = 100)
        next();
    });

    // settings
    app.set('port', process.env.PORT || 3000);
    app.use(morgan('dev'));
    const storage = multer.diskStorage({
        destination: path.join(__dirname, '../public/upload/pdfs'),
        limits: { fileSize: 100000000 },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });

    app.use(multer({ storage, }).array('pdf'));
    // app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).array('pdf'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // routes
    routes(app);

    // static files 
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // errorhandlers
    if ('development' === app.get('env')) {
        app.use(errorHandler);
    }
    return app;
} 