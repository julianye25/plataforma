const fs = require('fs');

function eliminar(ruta) {
    for (let i = 0; i < ruta.length; i++) {
        const element = ruta[i];
        fs.unlinkSync(element, (err) => {
            if (err) throw err;
            console.log(ruta);
        });
    }
}


module.exports = eliminar;
