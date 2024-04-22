'use strict'

var Clients = require('../models/clients');
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const msgs = require('../utils/MessagesResultHttp');
const httpResults = require('../utils/ResultHttp');

var controller = {

    //********************************************************* */
    //                      Create Client                       //
    //********************************************************* */
    createClient : function(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(httpResults.HTTP_BAD_REQUEST).send({
                status: httpResults.HTTP_BAD_REQUEST,
                errors: errors.array()
            });
        }

        //Declaracion de variable local
        var data = req.body;

        //Verificar cliente existente antes de crear un registro nuevo
        Clients.findOne({
            idClient: parseInt(data.idClient)
        })
        .then(clientFound =>{
            //Validacion de cliente duplicado
            if (clientFound){
                return res.status(httpResults.HTTP_BAD_REQUEST).send({
                    status: httpResults.HTTP_BAD_REQUEST,
                    message: msgs.ClientExist
                });
            }

            let today = new Date().toISOString();
            
            //Continuar proceso de creacion de cliente nuevo
            var create_client = new Clients();
            create_client.idClient = data.idClient;
            create_client.name = data.name;
            create_client.age = data.age;
            create_client.address = data.address;
            create_client.city = data.city;
            create_client.state = data.state;
            create_client.country = data.country;
            create_client.phone = data.phone;
            create_client.email = data.email;
            create_client.active = true;
            create_client.createBy = req.decode.user.name;
            create_client.createDateTime = today;

            create_client.save()
            .then(result =>{
                console.log(result);
                return res.status(httpResults.HTTP_OK).send({
                    status: httpResults.HTTP_OK,
                    message: msgs.ClientCreated,
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
        .catch(error => {
            console.error(error);
            return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                message: msgs.ProcessErr
            });
        });
    },

};

module.exports = controller;