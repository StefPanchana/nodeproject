'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    age: Number,
    idUser: Number,
    email: String,
    password: String
});

module.exports = mongoose.model('users', UserSchema);