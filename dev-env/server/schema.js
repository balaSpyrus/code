
var mongoose = require('mongoose');
var mySchema = mongoose.Schema({
	key: String
});
module.exports = mongoose.model('myschema', mySchema);