'use strict'

const msgs = require('../utils/MessagesResultHttp');
const httpResults = require('../utils/ResultHttp');
const Queue = require('bull');

const myQueue = new Queue('myQueue', {
    redis: {
        host: 'redis-12215.c263.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 12215,
        password: 'ho3dejFPoY4NMtEVG1wGmppurqQHGynp'
    }
});


// Event listener for completed jobs
myQueue.on('completed', (job, result) => {
    console.log(`Job ID ${job.id} completed with result:`, result);
  });
  
// Event listener for failed jobs
myQueue.on('failed', (job, err) => {
console.error(`Job ID ${job.id} failed with error:`, err);
});

myQueue.process(async (job) => {
    console.log('Processing job:', job.id);

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('End Processing job:', job.id);
});

var Controller = {
    activeBull: async function (req, result){

        for (let i = 0; i< 5 ; i++){
            myQueue.add({
                index: 1
              });
        }

        return result.status(httpResults.HTTP_OK).send({
            status: httpResults.HTTP_OK,
            message: msgs.ProcessOK
        });
    }
}

module.exports = Controller;