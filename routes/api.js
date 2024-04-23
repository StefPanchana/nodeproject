'use strict'

//Declaración de dependencias de la clase
const express = require('express');
const {body} = require('express-validator');
var api = express.Router();
var middleware = require('../middleware/middleware');

//Declaracion de controladores
var UsersController = require('../controllers/user');
var ClientsController = require('../controllers/client');
var AuthController = require('../controllers/auth');

//-------------------------------------------------//
//-------------------------------------------------//
//             Desarrollo de la API y CRUDs
//-------------------------------------------------//
//-------------------------------------------------//

//*************************/
//Routes for Loggin Process
//*************************/

//-- Loggin
    api.post('/loggin', [
        body("email").not().isEmpty(),
        body("password").not().isEmpty(),
    ],
    AuthController.loggin_user);

//-- Logout
    api.post('/logout', middleware.userProtectUrl, AuthController.logout_user);


//*************************/
//Routes for User CRUD
//*************************/
//-- Create 
    api.post('/user', [
        body("idUser").not().isEmpty(),
        body("name").not().isEmpty(),
        body("age").not().isEmpty(),
        body("email").not().isEmpty(),
        body("password").not().isEmpty()
    ],
    middleware.userProtectUrl, 
    UsersController.createUser);

//-- Read
    api.get('/user', middleware.userProtectUrl, UsersController.getAllUsers);

    api.get('/user/:idUser', [
        body("idUser").not().isEmpty(),
    ], 
    middleware.userProtectUrl, 
    UsersController.getUserById);

//-- Update
    api.put('/user/:idUser',[
        body("idUser").not().isEmpty(),
        body("name").not().isEmpty(),
        body("age").not().isEmpty(),
        body("email").not().isEmpty(),
        body("password").not().isEmpty()
    ],
    middleware.userProtectUrl, 
    UsersController.updateUser);

//-- Delete
    api.delete('/user/:idUser', middleware.userProtectUrl, UsersController.deleteUser);

//*************************/
//Routes for Clients CRUD
//*************************/
//-- Create 
api.post('/client', [
    body("idClient").not().isEmpty(),
    body("name").not().isEmpty(),
    body("age").not().isEmpty(),
    body("phone").not().isEmpty(),
    body("email").not().isEmpty()
],
middleware.userProtectUrl, 
ClientsController.createClient);

//-- Read
api.get('/client', middleware.userProtectUrl, ClientsController.getAllClients);

api.get('/client/:idClient', [
    body("idClient").not().isEmpty(),
], 
middleware.userProtectUrl, 
ClientsController.getClientById);

//-- Update
api.put('/client/:idClient',[
    body("idClient").not().isEmpty(),
    body("name").not().isEmpty(),
    body("age").not().isEmpty(),
    body("address").not().isEmpty(),
    body("city").not().isEmpty(),
    body("state").not().isEmpty(),
    body("country").not().isEmpty(),
    body("phone").not().isEmpty(),
    body("email").not().isEmpty()
],
middleware.userProtectUrl, 
ClientsController.updateClient);

//-- Delete
api.delete('/client/:idClient', middleware.userProtectUrl, ClientsController.deleteClient);

//-- Clear By Id Client previous delete
api.delete('/clientclear/:idClient', middleware.userProtectUrl, ClientsController.cleanClient);

//*************************/
//Routes for Cars CRUD
//*************************/

module.exports = api;