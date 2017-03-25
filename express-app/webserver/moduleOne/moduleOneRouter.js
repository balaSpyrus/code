'use strict';

const logger = require('../applogger');
const Router = require('express').Router();
const controller = require('./moduleOneController');

Router.get('/:entityname', function(req, res) {
  try {
    controller.getEntityOfId(req.params.entityname, (err, result) => {
      if (err) {
        logger.error('Error in fetching entity ', err);
        return res.status(500).json({
          error: 'Something went wrong, please try later..!'
        });
      }

      //  SUCCESS
      return res.json(result);
    });
  } catch (err) {
    logger.error("Caught exception: ", err);

    return res.status(500).json({
      error: 'Something went wrong, please try later..!'
    });
  }
});

module.exports = Router;
