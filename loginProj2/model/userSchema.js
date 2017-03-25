var mongoose = require('mongoose');
var userSchema = mongoose.Schema;
var user=new userSchema({
	
	name: String,
	email:String,
	password:String

},{versionKey:false});

var user = mongoose.model('userDetail',user);
module.exports=user;