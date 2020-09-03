const officegen = require('officegen')
const fs = require('fs-extra')
var path = require('path');

async function word(direccion) {
    let docx = officegen({
        type: 'docx', // We want to create a Microsoft Word document.
        pageMargins: { top: 0, right: 0, bottom: 0, left: 0 },
        pageSize: ('letter paper'),
        orientation: ('landscape')
    })

    // Officegen calling this function after finishing to generate the docx document:
    docx.on('finalize', function (written) {
        console.log(
            'Finish to create a Microsoft Word document.'
        )
    })

    // Create a new paragraph:
    let pObj = docx.createP()

    // We can even add images:
    for (let i = 0; i < direccion.length; i++) {
        const element = direccion[i];
        await pObj.addImage(path.resolve(element), { cx: 765, cy: 500 })
    }


    // Let's generate the Word document into a file:
    let out = fs.createWriteStream('./src/public/upload/convert-images/example.docx')

    out.on('error', function (err) {
        console.log(err)
    })

    // Async call to generate the output file:
    return docx.generate(out)
}

module.exports = word;

