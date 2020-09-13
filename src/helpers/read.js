const fs = require('fs');

let directory = "src/public/upload/final-images";

let files = fs.readdirSync(directory);

module.exports = files