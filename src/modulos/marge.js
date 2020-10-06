const merge = require('easy-pdf-merge');

merge(source_files,dest_file_path,function(err){
  if(err) {
    return console.log(err)
  }
  console.log('Success')
});