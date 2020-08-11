const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const multer = require('multer');
const PDF2Pic = require("pdf2pic");
const merge = require('easy-pdf-merge');

const Pdf = require('../models/pdf')

const ctrl = {};

ctrl.index = (req, res) => {

};

var upload = multer();

ctrl.create = ("/pdfs", upload.array("uploads", null), function(req, res, err) {
   var file = req.files;
    res.send('subido')
  console.log(req.files);

   /* merge([`../public/upload/${file.originalname}.pdf `, `../public/upload/${file.filename} `],'test.pdf',function(err){
    if(err) {
      return console.log(err)
    }
    console.log('Success')
  });  */

    const pdf2pic = new PDF2Pic({
    density: 100,           // output pixels per inch
    savename: "untitled",   // output file name
    savedir: "./images",    // output file location
    format: "png",          // output file format
    size: "600x600"         // output size in pixels
  });
   
  pdf2pic.convert(`../public/upload/${file.originalname} ${file.fieldname}`).then((resolve) => {
    console.log("pdf converter successfully!");
   
    return resolve;
  });  
});

/* ctrl.create = async (req, res) => {
    
}; */

ctrl.remove = (req, res) => {
    
};

module.exports = ctrl;