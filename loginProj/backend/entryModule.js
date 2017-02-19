var userSchema =require('../model/userSchema');
var router = require('express').Router();



router.post('/login',function(req,res){
	
	var details=req.body.data;

	userSchema.findOne({email:details.email},function(err,data){
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

router.post('/register',function(req,res){
	
	var j=req.body.data;
	var add=new userSchema({
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