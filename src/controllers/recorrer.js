const walk    = require('walk');
var files   = [];

// Walker options
var walker  = walk.walk('../public/upload/', { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
    
});

walker.on('end', function() {
    console.log(files);
});

var array = files;

module.exports = {
    walker,
    array
}