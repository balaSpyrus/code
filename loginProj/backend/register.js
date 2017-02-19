var register =require('../model/registerSchema');
var router = require('express').Router();



router.post('/',function(req,res){
	
 var j=req.body.data;
 var add=new register({
     name: j.name,
     email:j.email,
     password:j.password
});

 
 add.save(function(err,data){
 	if(err)
 	{
 		res.send({err:"sorry cannot save data"})
 	}
 	console.log(data)
 	res.send(data);
 });
 

});

module.exports = router