const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/');
const logger = require('./applogger');

function createApp() {
  const app = express();
  return app;
}

function setupStaticRoutes(app) {
  app.use(express.static(path.resolve(__dirname, '../', 'webapp')));
  return app;
}

function setupMiddlewares(app) {
  //For logging each requests 
  app.use(morgan('dev'));

  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  return app;
}

function setupMongooseConnections() {
  mongoose.connect(config.MONGO_URL);

  mongoose.connection.on('connected', function() {
    logger.debug('Mongoose is now connected to ', config.MONGO_URL);
  });

  mongoose.connection.on('error', function(err) {
    logger.error('Error in Mongoose connection: ', err);
  });

  mongoose.connection.on('disconnected', function() {
    logger.debug('Mongoose is now disconnected..!');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      logger.info(
        'Mongoose disconnected on process termination'
      );
      process.exit(0);
    });
  });
}

function setupRestRoutes(app) {
  app.use('/resourceOne', require(path.join(__dirname, './moduleOne')));
  app.use('/resourceTwo', require(path.join(__dirname, './moduleTwo')));

  app.use(function(req, res, next) {
    var err = new Error('Resource not found');
    err.status = 404;
    return res.status(err.status).json({
      "error": err.message
    });
  });

  app.use(function(err, req, res, next) {
    logger.error("Internal error in watch processor: ", err);
    return res.status(err.status || 500).json({
      "error": err.message
    });
  });

  return app;
}

module.exports = function() {
  let app = createApp();

  app = setupStaticRoutes(app);

  app = setupMiddlewares(app);

  app = setupRestRoutes(app);

  setupMongooseConnections();

  return app;
};
