'use strict'

//Declaración de dependencias de la clase
var jwt = require('jsonwebtoken');
var Users = require('../models/users');
var Sessions = require('../models/accesstoken');
const msgs = require('../utils/MessagesResultHttp');
const httpResults = require('../utils/ResultHttp');
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');

var controller = {

    loggin_user: function(req, res){
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(httpResults.HTTP_BAD_REQUEST).send({
                status: httpResults.HTTP_BAD_REQUEST,
                errors: errors.array()
            });
        }

        //Declaracion de variable local
        var data = req.body;

        Users.findOne({
            email: data.email
        })
        .then(userFound =>{
            if (userFound){
                bcrypt.compare(data.password, userFound.password, function(err, result){
                    if (result){
                        const payload = {
                            user: userFound,
                        }
    
                        let access_token = jwt.sign(payload, process.env.KEY, {
                            expiresIn: process.env.PASS_VALID
                        });
    
                        let today = new Date().toISOString();
    
                        let update_session = {
                            user: userFound.email,
                            key: access_token,
                            creationDate: today,
                            expirationDate: process.env.PASS_VALID,
                            active: true
                        }
    
                        Sessions.findOneAndUpdate({user:userFound.email}, update_session, {upsert: true, new:true})
                        .then(session =>{
                            if (!session){
                                return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                                    status: httpResults.HTTP_UNAUTHORIZED,
                                    message: msgs.UserNotFound
                                });
                            }
                            else{
                                return res.status(httpResults.HTTP_OK).send({
                                    status: httpResults.HTTP_OK,
                                    message: msgs.LogginOk,
                                    token: access_token
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                                status: httpResults.HTTP_UNAUTHORIZED,
                                message: msgs.DataNotValid
                            });
                        });
                    }
                    else{
                        return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                            status: httpResults.HTTP_UNAUTHORIZED,
                            message: msgs.DataNotValid
                        });
                    }
                });
            }
            else{
                return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                    status: httpResults.HTTP_UNAUTHORIZED,
                    message: msgs.DataNotValid
                });
            }
        })
        .catch(error => {
            console.error(error);
            return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                status: httpResults.HTTP_UNAUTHORIZED,
                message: msgs.DataNotValid
            });
        });
    },

    logout_user: function(req, res){
        const token = req.headers[process.env.HEADER_TOKEN];

        Sessions.findOneAndDelete({
            user: req.decode.user.email,
            key: token
        })
        .then(session =>{
            if (!session){
                return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                    status: httpResults.HTTP_UNAUTHORIZED,
                    message: msgs.TokenInvalid
                });
            }

            return res.status(httpResults.HTTP_OK).send({
                status: httpResults.HTTP_OK,
                message: msgs.LogoutOK
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                message: msgs.TokenInvalid
            });
        });
    }
};

module.exports = controller;