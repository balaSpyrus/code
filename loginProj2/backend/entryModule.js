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
			res.send({msg:"USER NOT FOUND"});
		}
		else if(data.password===details.password)
		{
			res.send({msg:data.name});
			console.log(data)
		}
		else
		{
			res.send({msg:"INCORRECT USERNAME/PASSWORD"});
		}	

	})

});

router.post('/register',function(req,res){
	
	
	userSchema.findOne({email:req.body.data.email},function(err,data){
		if(err)
		{
			res.send({msg:"INTERNAL ERROR"})
		}
		else if(data!==null)
		{
			res.send({msg:"USER ALREADY EXISTS"});
		}	
		else
		{
			var j=req.body.data;
			var add=new userSchema({
				name: j.name,
				email:j.email.toLowerCase(),
				password:j.password,
				fName:j.fatherName,
				mName:j.motherName,
				DOB:j.dob,
				perAdd:j.perAdd,
				currAdd:j.currAdd,
				eduDetails:j.eduDetails,
				expDetails:j.expDetails

			});

			add.save(function(err,data){
				if(err)
				{
					res.send({msg:"ERROR WHILE SAVING USER DATA"})
				}
				console.log(data)
				res.send({msg:"SUCCESSFULLY REGISTERED",data:data});
			});

		}
		

	})
	


});

module.exports = router