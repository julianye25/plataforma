const merge = require('easy-pdf-merge');

// const rutas = ['./src/public/upload/convert-images/rotulos1.pdf', './src/public/upload/convert-images/rotulos2.pdf', './src/public/upload/convert-images/rotulos3.pdf', './src/public/upload/convert-images/rotulos4.pdf']
function unir(rutas) {
  
  merge(rutas, './src/public/upload/Unido/rotulos.pdf', function (err) {
    if (err) {
        return console.log(err)
    }
    console.log('Success')
});
}

module.exports = unir
