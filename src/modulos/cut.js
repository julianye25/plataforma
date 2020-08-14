const jimp = require ('jimp');

var images = ['images/rotulo1.png', 'images/rotulo2.png'];

var jimps = [];

for (var i = 0; i < images.length; i++) {
  jimps.push(jimp.read(images[i]));
}

Promise.all(jimps).then(function(data) {
  return Promise.all(jimps);
}).then(function(data) {
  data[0].composite(data[1],1239.5,0);
  
  data[0].write('final-images/test.png', function() {
    console.log("wrote the image");
  });
});