const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function run(direccion) {
    // Create a new document and add a new page
    const doc = await PDFDocument.create();
    var page = doc.addPage();
    var contImagenes = 0;
    if (direccion) {
        for (let i = 0; i < direccion.length; i++) {
            element = direccion[i];
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
                if ((i + 1) != direccion.length) {
                    page = doc.addPage();
                }
            }
        }
    }


    // Write the PDF to a file
    fs.writeFileSync('./src/public/upload/convert-images/test.pdf', await doc.save());
}

module.exports = run;