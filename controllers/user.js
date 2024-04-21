'use strict'

var Users = require('../models/users');
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const msgs = require('../utils/MessagesResultHttp');
const httpResults = require('../utils/ResultHttp');

var controller = {

    getAllUsers : function(req, res) {
        Users.find({})
        .then(usersFound =>{
            return res.status(httpResults.HTTP_OK).send({
                status: httpResults.HTTP_OK,
                message: msgs.ProcessOK,
                data: usersFound
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                message: msgs.ProcessErr
            });
        });
    },

    getUserById : function(req, res) {
        Users.findOne({
            idUser: parseInt(req.params.idUser)
        })
        .then(userFound =>{
            return res.status(httpResults.HTTP_OK).send({
                status: httpResults.HTTP_OK,
                message: userFound == null? msgs.UserNotFound : msgs.ProcessOK,
                data: userFound
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                message: msgs.ProcessErr
            });
        });
    },

    createUser : function(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(httpResults.HTTP_BAD_REQUEST).send({
                status: httpResults.HTTP_BAD_REQUEST,
                errors: errors.array()
            });
        }

        //Declaracion de variable local
        var data = req.body;

        //Verificar usuario existente antes de crear un registro nuevo
        Users.findOne({
            idUser: parseInt(data.idUser)
        })
        .then(userFound =>{
            //Validacion de usuario duplicado
            if (userFound){
                return res.status(httpResults.HTTP_BAD_REQUEST).send({
                    status: httpResults.HTTP_BAD_REQUEST,
                    message: msgs.UserExist
                });
            }
            
            //Generar encriptacion de password
            const saltRounds = 10;

            bcrypt.genSalt(saltRounds, function(err, salt){
                bcrypt.hash(data.password, salt, function(err, hash){

                    //Continuar proceso de creacion de usuario
                    var create_user = new Users();
                    create_user.idUser = data.idUser;
                    create_user.name = data.name;
                    create_user.age = data.age;
                    create_user.email = data.email;
                    create_user.password = hash;

                    create_user.save()
                    .then(result =>{
                        console.log(result);
                        return res.status(httpResults.HTTP_OK).send({
                            status: httpResults.HTTP_OK,
                            message: msgs.UserCreated,
                            data: result
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                            status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                            message: msgs.ProcessErr
                        });
                    });
                })
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                message: msgs.ProcessErr
            });
        });
    },

    updateUser : function(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(httpResults.HTTP_BAD_REQUEST).send({
                status: httpResults.HTTP_BAD_REQUEST,
                errors: errors.array()
            });
        }

        //Declaracion de variable local
        var data = req.body;

        //Generar encriptacion de password
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function(err, salt){
            bcrypt.hash(data.password, salt, function(err, hash){
                
                var update_user = {
                    idUser: data.idUser,
                    name: data.name,
                    age: data.age,
                    email: data.email,
                    password: hash
                }

                Users.findOneAndUpdate({
                    idUser: parseInt(req.params.idUser)
                },
                update_user)
                .then(userFound =>{
                    return res.status(httpResults.HTTP_OK).send({
                        status: httpResults.HTTP_OK,
                        message: userFound == null? msgs.UserNotFound : msgs.UserUpdated
                    });
                })
                .catch(error => {
                    console.error(error);
                    return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                        status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                        message: msgs.ProcessErr
                    });
                });
            })
        });
    }, 

    deleteUser : function(req, res) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            return res.status(httpResults.HTTP_BAD_REQUEST).send({
                status: httpResults.HTTP_BAD_REQUEST,
                errors: errors.array()
            });
        }

        Users.findOneAndDelete({
            idUser: parseInt(req.params.idUser)
        })
        .then(userFound =>{
            return res.status(httpResults.HTTP_OK).send({
                status: httpResults.HTTP_OK,
                message: userFound == null? msgs.UserNotFound : msgs.UserDeleted
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                message: msgs.ProcessErr
            });
        });
    }
};

module.exports = controller;