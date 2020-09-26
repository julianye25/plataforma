const fs = require('fs');

function leer(directorio) {
    let rutas = []
    fs.readdirSync(directorio).forEach(file => {
        file = directorio + file
        rutas.push(file)
    });
    return rutas
}

module.exports = leer