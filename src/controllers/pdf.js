const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const multer = require('multer');
const PDF2Pic = require("pdf2pic");

// Modelo de base de datos
const pdf = require('../models/pdf');

// controladores
const ctrl = {};

ctrl.index = (req, res) => {

};

var upload = multer();

// upload files
ctrl.up = ("/file", upload.fields('pdf'), (req, res, next) => {
  
});

// convert 1
ctrl.create =  ("/pdfs", upload.fields('pdf'),  async (req, res, next) => {
  console.log(req.files)
  const newpdf = new pdf({ originalname: req.files});
  console.log(newpdf);
  res.render('pdf');
});

// convert 2
ctrl.create2 =  ("/pdfs2", upload.fields('pdf'),  async (req, res, next) => {
  console.log(req.files)
  const newpdf = new pdf({ originalname: req.files});
  console.log(newpdf);
  res.render('pdf2');
});


ctrl.remove = (req, res) => {
    
};

module.exports = ctrl;