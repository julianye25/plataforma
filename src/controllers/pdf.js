const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');

// Modelo de base de datos
const pdf = require('../models/pdf');

// Modulos
const convetirAImagen = require('../modulos/pdf_a_png');
const unirImagenes = require('../modulos/cut');
const archivoPdf = require('../modulos/generatePdf');

// Helpers
const file = require('../helpers/read');
const eliminar = require('../helpers/unlink');

// controladores
const ctrl = {};

// Arrays para eliminar
var pdfs = [];

ctrl.index = (req, res) => {

};

// ========== Peticiones =============
var upload = multer();

// Subida files
ctrl.up = ("/file", upload.fields('pdf'), (req, res, next) => {
});

// Formato 1
ctrl.create2 = ("/pdfs2", upload.fields('pdf'), async (req, res, next) => {
  // Inicializacion de variables y arreglos
  let nombreImagen = 1;
  arregloRutaImagenes = []
  req.files.forEach(pdfFile => {
    const resultado = convetirAImagen(pdfFile.originalname, nombreImagen);
    resultado.then(function (result) {
      console.log(result);
      arregloRutaImagenes.push(result);
      archivoPdf(arregloRutaImagenes);
      console.log(result);
    })

    nombreImagen++;
  });
  res.render('pdf');
})

// Formato 2
ctrl.create = ("/pdfs", upload.fields('pdf'), async (req, res, next) => {
  // Inicializacion de variables y arreglos
  var nombreEdit = 0;
  let nombreImagen = 1;
  let arregloRutaImagenes = [];
  var promises = []

  req.files.forEach(pdfFile => {
    const resultado = convetirAImagen(pdfFile.originalname, nombreImagen);
    promises.push(resultado.then(function (result) {
      arregloRutaImagenes.push(result);
      if (arregloRutaImagenes.length % 2 === 0) {
        nombreEdit++;
        const dosImagenes = arregloRutaImagenes.slice(0, 2);
        unirImagenes.unir(dosImagenes, nombreEdit);
        arregloRutaImagenes = [];
      }
    }))
    nombreImagen++;
  })

  arrayDeImagenes = await file()
  Promise.all(promises).then(() =>
    console.log(nombreEdit),
    archivoPdf(arrayDeImagenes),
  );

  res.render('pdf2');
});

ctrl.remove = (req, res) => {
};

module.exports = ctrl;