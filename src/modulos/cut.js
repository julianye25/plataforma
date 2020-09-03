const jimp = require('jimp');

async function unir(images, nombreEdit) {
  // var images = ['images/rotulo1.png', 'images/rotulo2.png'];
  console.log(images);
  console.log(nombreEdit);
  var jimps = [];

  for (var i = 0; i < images.length; i++) {
    jimps.push(jimp.read(images[i]));
  }

  await Promise.all(jimps).then(function (data) {
    return Promise.all(jimps);
  }).then(function (data) {
    data[0].composite(data[1], 1239.5, 0);
    data[0].write('./src/public/upload/final-images/' + nombreEdit + '.png', function () {
      console.log("wrote the image");
    });
  });
}

module.exports = unir
