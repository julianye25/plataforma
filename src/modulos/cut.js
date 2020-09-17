const jimp = require('jimp');

function unir(images, nombreEdit) {
  var jimps = [];

  for (var i = 0; i < images.length; i++) {
    jimps.push(jimp.read(images[i]));
  }

  Promise.all(jimps).then(function (data) {
    return Promise.all(jimps);
  }).then(async function (data) {
    data[0].composite(data[1], 1239.5, 0);
    const ruta = './src/public/upload/final-images/' + nombreEdit + '.png'
    data[0].write(ruta, function () {
    });
  });
}

module.exports = {
  unir,
}


