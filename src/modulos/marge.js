const merge = require('easy-pdf-merge');


function unir(files) {
  merge(files, 'src/public/upload/pdfCompleto/rotulos.pdf', function (err) {
    if (err) {
        return console.log(err)
    }
    console.log('Success')
  });  
}
 
module.exports = unir;