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

ctrl.descargar = (req, res) => {
  res.download(path.join(__dirname, '../public/upload/convert-images/rotulos.pdf')); // Set disposition and send it.
};

// ========== Peticiones =============
var upload = multer();

// Subida files
ctrl.up = ('/file', upload.fields('pdf'), (req, res, next) => {});

// Formato 1
ctrl.create2 =
  ('/pdfs2',
  upload.fields('pdf'),
  async (req, res, next) => {
    // Inicializacion de variables y arreglos
    let nombreImagen = 1;
    var resultado;
    arregloRutaImagenes = [];
    let arregloPromesasImagenes = [];
    req.files.forEach((pdfFile) => {
      setTimeout(() => {
        resultado = convetirAImagen(pdfFile.originalname, nombreImagen);
      }, 1000);
      nombreImagen++;
      arregloPromesasImagenes.push(resultado);
    });
    Promise.all(arregloPromesasImagenes).then((arregloImagenes) => {
      archivoPdf(arregloImagenes).then(() => {
        // res.render('pdf');
        res.status(200).json({
          ok: true,
        });
        eliminarArchivos();
      });
    });
  });

// Formato 2
ctrl.create =
  ('/pdfs',
  upload.fields('pdf'),
  async (req, res, next) => {
    // Inicializacion de variables y arreglos
    let nombreImagen = 1;
    let promesasConvertirPdfAImagen = [];

    req.files.forEach((pdfFile) => {
      const resultado = convetirAImagen(pdfFile.originalname, nombreImagen);
      promesasConvertirPdfAImagen.push(resultado);
      nombreImagen++;
    });
    Promise.all(promesasConvertirPdfAImagen).then((arregloNombresImagenes) => {
      let promesasImagenesUnidas = [];
      if (arregloNombresImagenes.length % 2 !== 0) {
        arregloNombresImagenes.push('./src/public/img/blanco.png');
      }
      let nombreImagenUnida = 1;
      for (let indice = 0; indice < arregloNombresImagenes.length; indice += 2) {
        const arregloDeDosImagenes = arregloNombresImagenes.slice(indice, indice + 2);
        promesasImagenesUnidas.push(unirImagenes.unir(arregloDeDosImagenes, nombreImagenUnida));
        nombreImagenUnida++;
      }
      Promise.all(promesasImagenesUnidas).then(() => {
        const proporcion = arregloNombresImagenes.length * 5;
        setTimeout(() => {
          const arregloImagenesUnidades = file('src/public/upload/final-images/');
          console.log(arregloImagenesUnidades);
          archivoPdf(arregloImagenesUnidades).then(() => {
            // res.render('pdf2');
            res.status(200).json({
              ok: true,
            });
            eliminarArchivos();
          });
        }, proporcion);
      });
    });
  });

function eliminarArchivos() {
  const arregloPdfsABorrar = file('src/public/upload/pdfs/');
  eliminar(arregloPdfsABorrar);
  const arregloImagenesABorrar = file('src/public/upload/images/');
  eliminar(arregloImagenesABorrar);
  const arregloImagenesFinalesABorrar = file('src/public/upload/final-images/');
  eliminar(arregloImagenesFinalesABorrar);
}

ctrl.remove = (req, res) => {};

module.exports = ctrl;
