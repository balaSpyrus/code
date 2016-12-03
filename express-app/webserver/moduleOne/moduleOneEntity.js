const mongoose = require('mongoose');

/* beautify ignore:start */
/* beautify preserve:start */
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  desc: { type: String, required: true},
  details: [
    {
      type: { type: String, required: true },
      elements: { type: Array }
    }
  ]
}, {collection: 'entityOnes', versionKey: false});

schema.index({name: 1}, {unique: true});

const model = mongoose.model('entityOnes', schema);

module.exports = {
  EntityOneModel: model
};

/* beautify preserve:end */
/* beautify ignore:end */
