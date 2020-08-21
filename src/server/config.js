const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
var pdf2img = require('pdf2img');
const express = require('express');

const routes = require('../routes/index');
const errorHandler = require('errorhandler');

module.exports = app => {
    // settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs ({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir:path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
    }));
    app.set('view engine', '.hbs');

    // middlewatres
    app.use(morgan('dev'));
    const storage = multer.diskStorage ({
        destination: path.join(__dirname, '../public/upload'),
        limits: {fileSize: 1000000},
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });

    app.use(multer({storage,}).array('pdf'));
    // app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).array('pdf'));
    app.use(express.urlencoded({extended: false}));
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