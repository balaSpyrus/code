const logger = require('./../../applogger');

//const amqp = require('amqplib/callback_api');
const amqp = require('amqplib');
const highland = require('highland');

// require('events').EventEmitter.defaultMaxListeners = Infinity;
const startSearcher = function(jobID) {
 let amqpConn = amqp.connect('amqp://localhost');

 amqpConn
   .then(function(conn) {
     logger.info('[*] Connected to AMQP successfully..!');
     return conn.createChannel();
   })
   .then(function(chConn) {
     logger.info('[*] Established AMQP Channel connection successfully..!');

     //@TODO take the crawler MQ name from Config
     let crawlerMQName = 'searcher';

     //making durable as false, so that .....
     chConn.assertQueue(crawlerMQName, { durable: false })
       .then(function(ok) {
         logger.debug("What is ok: ", ok);
         logger.debug('[*] Waiting for messages on [' + crawlerMQName + '], to exit press CTRL+C ');
         chConn.sendToQueue(crawlerMQName,new Buffer(jobID) );
         logger.debug("msg sent to searcher .. ..  ..");
       }); //end of assertQueue
   }); //end of channelConnection
}

module.exports = {
 startSearcher: startSearcher
};