var mongoose = require('mongoose');
var registerSchema = mongoose.Schema;
     var register=new registerSchema({
    
     name: String,
     email:String,
     password:String

},{versionKey:false});

var register = mongoose.model('user',register);
module.exports=register;