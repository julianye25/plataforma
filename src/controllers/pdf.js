const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const multer = require('multer');

// Modelo de base de datos
const pdf = require('../models/pdf');
const convetirAImagen = require('../modulos/pdf_a_png');
const unirImagenes = require('../modulos/cut');
const archivoWord = require('../modulos/generateWord')


// controladores
const ctrl = {};

ctrl.index = (req, res) => {

};

var upload = multer();

// upload files
ctrl.up = ("/file", upload.fields('pdf'), (req, res, next) => {

});

// convert 1
ctrl.create = ("/pdfs", upload.fields('pdf'), async (req, res, next) => {
  let nombreEdit = 0;
  let nombreImagen = 1;
  let arregloRutaImagenes = [];
  req.files.forEach(pdfFile => {
    const resultado = convetirAImagen(pdfFile.originalname, nombreImagen);
    resultado.then(function (result) {
      arregloRutaImagenes.push(result);
      if (arregloRutaImagenes.length % 2 === 0) {
        nombreEdit++;
        const dosImagenes = arregloRutaImagenes.slice(0, 2);
        unirImagenes(dosImagenes, nombreEdit);
        arregloRutaImagenes = [];
      }
    });
    nombreImagen++;
  });
  res.render('pdf');
});

// convert 2
ctrl.create2 = ("/pdfs2", upload.fields('pdf'), async (req, res, next) => {
  let nombreImagen = 1;
  arregloRutaImagenes = []
  req.files.forEach(pdfFile => {
    const resultado = convetirAImagen(pdfFile.originalname, nombreImagen);
    resultado.then(function (result) {
      arregloRutaImagenes.push(result);
      archivoWord(arregloRutaImagenes);
      console.log(arregloRutaImagenes);
    })
    nombreImagen++;
  });
  res.send('Funcionando');
})


ctrl.remove = (req, res) => {

};

module.exports = ctrl;