'use strict'

//Se agregan dependencias necesarias en la App
const express = require('express');
const app = express()
var bodyParser = require('body-parser');
var routes = require('../routes/api');
const httpResults = require('../utils/ResultHttp');

//Se aplica el uso de bodyparser para procesos de decodificacion
app.use(bodyParser.urlencoded({
    extended : false
}));

app.use(bodyParser.json({
    parameterLimit : 1000000,
    limit: '50mb',
    extended:false
}));

//Se aplica uso de captura de errores por validacion de body
app.use((err, req, res, next)=>{
    if (err instanceof SyntaxError && err.status === httpResults.HTTP_BAD_REQUEST && 'body' in err){
        return res.status(httpResults.HTTP_BAD_REQUEST).send({
            status: httpResults.HTTP_BAD_REQUEST,
            message: err.message
        });
    }
    next();
});

//Se aplica uso de las rutas del proyecto
app.use('', routes);

//Exporte de la clase App para instancia del Server
module.exports = app;