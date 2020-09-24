const fs = require('fs');

let directory = "src/public/upload/final-images";
var rutas = []

async function leer() {
    fs.readdirSync(directory).forEach(async file => {
        file = "src/public/upload/final-images/" + file
        await rutas.push(file)
    });

    return rutas
}

module.exports = leer