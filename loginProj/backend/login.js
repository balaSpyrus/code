var login =require('../model/registerSchema');
var router = require('express').Router();



router.post('/',function(req,res){
	
 var details=req.body.data;

login.findOne({email:details.email},function(err,data){
	if(err)
 	{
 		res.send({msg:"sorry cannot retrieve data"})
 	}
 	else if(data===null)
 	{
 		res.send({msg:"not found"});
 	}
 	else if(data.password===details.password)
 	{
res.send({msg:data.name});
console.log(data)
 	}
 	else
 	{
res.send({msg:"incorrect"});
 	}	
 	
})
 
 

});

module.exports = router