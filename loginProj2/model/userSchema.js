var mongoose = require('mongoose');
var userSchema = mongoose.Schema;
var user=new userSchema({
	
	name: String,
	email:String,
	password:String,
	fName:String,
	mName:String,
	DOB:Date,
	perAdd:Object,
	currAdd:Object,
	eduDetails:Array,
	expDetails:Array

},{versionKey:false});

var user = mongoose.model('userDetail',user);
module.exports=user;