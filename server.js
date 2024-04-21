'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
var app = require('./cli/app');
var port = process.env.PORT;
const msgs = require('../nodeproject/utils/MessagesResultHttp');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
.then(
    () =>{
        console.log(msgs.ConnectionSucessfull);
        
        var server = app.listen(port, () => {
            console.log(msgs.ListeningApp + port)
          });

        server.timeout = 120000;
    }
)
.catch(err => console.log(msgs.BDErrConnection + " : " + err));

