'use strict';

const logger = require('../applogger');
const EntityOneModel = require('./moduleOneEntity').EntityOneModel;

const getEntityOfId = function(entityname, callback) {
  const query = {
    name: entityname
  };

  const fieldsExclude = {
    _id: 0
  };

  EntityOneModel.findOne(query, fieldsExclude, function(err, entityDocument) {
    if (err) {
      logger.error(
        "Encountered error at moduleOneController::getEntityOfId, error: ",
        err);
      return callback(err, {});
    }

    if (!entityDocument) {
      logger.error('Requested Entity not found, query: ', query);
      return callback('Entity not available or not found..!', {});
    }

    return callback(null, entityDocument);
  });
};

module.exports = {
  getEntityOfId: getEntityOfId
};
