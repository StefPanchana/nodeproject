'use strict'

require('dotenv').config();
var jwt = require('jsonwebtoken');
var Sessions = require('../models/accesstoken');
const msgs = require('../utils/MessagesResultHttp');
const httpResults = require('../utils/ResultHttp');

var middleware = {

    userProtectUrl: function(req, res, next) {
        const token = req.headers[process.env.HEADER_TOKEN];

        if (token) {
            jwt.verify(token, process.env.KEY, (err, decode)=>{
                if (err){
                    return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                        status: httpResults.HTTP_UNAUTHORIZED,
                        message: msgs.TokenInvalid
                    });
                }
                else{
                    req.decode = decode;

                    Sessions.findOne({user:req.decode.user.email, key:token, active:true})
                    .then(session =>{
                        if (!session){
                            return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                                status: httpResults.HTTP_UNAUTHORIZED,
                                message: msgs.SessionInvalid
                            });
                        }
                        else{
                            next();
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(httpResults.HTTP_INTERNAL_SERVER_ERROR).send({
                            status: httpResults.HTTP_INTERNAL_SERVER_ERROR,
                            message: msgs.ProcessErr
                        })
                    });
                }
            });
        }
        else {
            return res.status(httpResults.HTTP_UNAUTHORIZED).send({
                status: httpResults.HTTP_UNAUTHORIZED,
                message: msgs.DataNotValid
            });
        }
    }
};

module.exports = middleware;