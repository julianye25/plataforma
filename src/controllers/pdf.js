const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const multer = require('multer');

const Pdf = require('../models/pdf')

const ctrl = {};

ctrl.index = (req, res) => {

};

var upload = multer();

ctrl.create = ("/pdfs", upload.array("uploads", null), function(req, res, err) {
   var file = req.files;
    res.send('subido')
  console.log(file);
});

/* ctrl.create = async (req, res) => {
    
}; */

ctrl.remove = (req, res) => {
    
};

module.exports = ctrl;