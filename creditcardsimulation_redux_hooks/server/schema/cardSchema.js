var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
  month: Number,
  year: Number,
  cvv: Number,
  name: String,
  number: String,
  type: String
});

module.exports =  mongoose.model('creditCards', cardSchema);
