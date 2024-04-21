'use strict'

//Declaración de dependencias de la clase
const express = require('express');
const {body} = require('express-validator');
var api = express.Router();
var middleware = require('../middleware/middleware');

//Declaracion de controladores
var UsersController = require('../controllers/user');
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


//*************************/
//Routes for Cars CRUD
//*************************/

module.exports = api;