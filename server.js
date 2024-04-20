'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
var app = require('./cli/app');
var port = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
.then(
    () =>{
        console.log("Conexión exitosa!");
        
        var server = app.listen(port, () => {
            console.log(`App escuchando en puerto: ${port}`)
          });

        server.timeout = 120000;
    }
)
.catch(err => console.log("Error en la conexion a la Base de Datos:" + err));

