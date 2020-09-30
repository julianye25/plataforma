const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

let name = 0

async function run(direccion) {
    // Create a new document and add a new page

    for (let indice = 0; indice < direccion.length; indice +=10) {
        const imagenes = direccion.slice(indice, indice + 10);
        
        const doc = await PDFDocument.create();
        var page = doc.addPage();
        var contImagenes = 0;
        if (imagenes) {
            for (let i = 0; i < imagenes.length; i++) {
                element = imagenes[i];
                img = fs.readFileSync(element);
                img = await doc.embedPng(img);
                if (contImagenes === 0) {
                    page.drawImage(img, {
                        width: 600, height: 400, y: 450
                    });
                    contImagenes++
                } else if (contImagenes === 1) {
                    page.drawImage(img, {
                        width: 600, height: 400, y: 30
                    });
                    contImagenes = 0
                    if ((i + 1) != imagenes.length) {
                        page = doc.addPage();
                    }
                }
                name++
            }
    }
    fs.writeFileSync(`./src/public/upload/convert-images/rotulos${name}.pdf`, await doc.save());
    }
    // Write the PDF to a file
}

module.exports = run;