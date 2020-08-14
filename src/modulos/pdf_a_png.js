const PDF2Pic = require("pdf2pic");
 
const pdf2pic = new PDF2Pic({
  density: 100,           // output pixels per inch
  savename: "untitled",   // output file name
  savedir: "./images",    // output file location
  format: "png",          // output file format
  size: "600x600"         // output size in pixels
});
 
pdf2pic.convert("./pdf/test_1.pdf").then((resolve) => {
  console.log("image converter successfully!");
 
  return resolve;
});

var files = `${file.filename}/.pdf`;
  var input   =  '../public/upload/' +  files;

    pdf2img.setOptions({
      type: 'png',                                // png or jpg, default jpg
      size: 2480,                                 // default 1024
      density: 1654,                               // default 600
      outputdir: __dirname + path.sep + 'output', // output folder, default null (if null given, then it will create folder name same as file name)
      outputname: 'rotulos-1',                         // output file name, dafault null (if null given, then it will create image name same as input name)
      page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
      quality: 1                               // jpg compression quality, default: 100
  });

   pdf2img.convert(input, function(err, info) {
    if (err) console.log(err)
    else console.log(info);
    });