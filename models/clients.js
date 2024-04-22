'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    idClient: Number,       //cedula
    name: String,           //nombre
    age: Number,            //edad
    address: String,        //direccion
    city: String,           //ciudad
    state: String,          //provincia
    country: String,        //pais
    phone: Number,          //telefono
    email: String,          //correo
    active: Boolean,        //estado del cliente 
    createBy: String,       //creado por (User)
    modifiedBy: String,     //modificado por (User)
    createDateTime: Date,   //fecha de creación
    updateDateTime: Date,    //fecha de modificación   
    deleteDateTime: Date    //fecha de eliminación logica
});

module.exports = mongoose.model('clients', ClientSchema);