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
const files = require('../helpers/read');
const eliminar = require('../helpers/unlink');


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
  let arregloFinal = [];

  req.files.forEach(pdfFile => {
    const resultado = convetirAImagen(pdfFile.originalname, nombreImagen);
    resultado.then(async function (result) {
      arregloRutaImagenes.push(result);
      if (arregloRutaImagenes.length % 2 === 0) {
        nombreEdit++;
        const dosImagenes = arregloRutaImagenes.slice(0, 2);
        await unirImagenes.unir(dosImagenes, nombreEdit);
        arregloRutaImagenes = [];
      }
    });
    nombreImagen++;
  });
  files.forEach(file => {
    file = "src/public/upload/final-images/" + file;
    arregloFinal.push(file);
  })

  // Generador archivo 
  await archivoPdf(arregloFinal);
  res.render('pdf');
});

// convert 2
ctrl.create2 = ("/pdfs2", upload.fields('pdf'), async (req, res, next) => {
  let nombreImagen = 1;
  arregloRutaImagenes = []
  req.files.forEach(pdfFile => {
    const resultado = convetirAImagen(pdfFile.originalname, nombreImagen);
    resultado.then(async function (result) {
      arregloRutaImagenes.push(result);
      // await archivoPdf(arregloRutaImagenes);
      archivoPdf(arregloRutaImagenes);
    })
    nombreImagen++;
  });
  res.send('Funcionando');
})


ctrl.remove = (req, res) => {

};

module.exports = ctrl;