const express = require('express');

const config = require('./server/config');


// database
require('./database');

async  () => {
    await  require('./modulos/pdf_a_png');
} 


const app = config(express());

// starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'), 'url' , 'http://localhost:3000/' );
})


  