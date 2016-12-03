'use strict';
const Router = require('express').Router();
const controller = require('./searchController');

Router.get('/:jobID', function(req, res) {
  try {
    controller.storeURL(req.params.jobID, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: 'Something went wrong, please try later..!'
        });
      }

      //  SUCCESS
      return res.json(result);
    });
  } catch (err) {
   return res.status(500).json({
    error: 'Something went wrong while pathing, please try later..!'
  });
 }
});

module.exports = Router;
