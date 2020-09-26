const PDF2Pic = require("pdf2pic");

function convertir(nombreArchivo, nombreImagen) {
  // const nombreArchivoSinExtension = nombreArchivo.split('.')[0];
  const pdf2pic = new PDF2Pic({
    density: 200,           // output pixels per inch
    savename: nombreImagen,   // output file name
    savedir: "./src/public/upload/images",    // output file location
    format: "png",          // output file format
    size: "2480x1654",         // output size in pixels
    // size: 2480,                                 // default 1024  
  });
  const ruta = "./src/public/upload/pdfs/" + nombreArchivo;
  return resultado = pdf2pic.convert(ruta).then((resolve) => {
    const rutaImagen = "./src/public/upload/images/" + nombreImagen + "_1.png";
    return rutaImagen;
  });;
}

module.exports = convertir;
