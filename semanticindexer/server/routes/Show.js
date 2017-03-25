var schema =require('../model/addJobSchema')
var router = require('express').Router();
router.get('/', function(req, res) {
schema.find(function(err, users){
//console.log(users);
if(err)
	{
			res.send('something went wrong');
		}
		res.send(users);
	} )
});

module.exports = router
