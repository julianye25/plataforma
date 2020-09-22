const fs = require('fs');

let directory = "src/public/upload/final-images";
var rutas = []

setTimeout(() => {
    fs.readdirSync(directory).forEach(file => {
        file = "src/public/upload/final-images/" + file
        rutas.push(file)
    });
}, 20000);

module.exports = rutas