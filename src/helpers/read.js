const fs = require('fs');

function leer(directorio) {
    let rutas = []
    fs.readdirSync(directorio)
    for (let file of directorio) {
        file = directorio + file
        rutas.push(file)
    }
    return rutas
}

module.exports = leer