const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const multer = require('multer');
const PDF2Pic = require("pdf2pic");


const pdf = require('../models/pdf');

const ctrl = {};

ctrl.index = (req, res) => {

};

var upload = multer();

ctrl.create = ("/pdfs", upload.fields('pdf'), function (req, res, next) {
  console.log(req.files)
  const newpdf = new pdf({ originalname: req.files.filename });
  console.log(newpdf);
  res.send('subido')
});

/* ctrl.create = async (req, res) => {
    
}; */

ctrl.remove = (req, res) => {
    
};

module.exports = ctrl;