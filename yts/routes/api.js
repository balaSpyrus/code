var express = require('express');
var router = express.Router();
var ytsData =require('../model/dataModel');
/* GET users listing. */
router.get('/data', function(req, res, next) {

	ytsData.find(function(err, datas){
		if(err)
		{
			res.send('something went wrong');
		}
		res.json(datas);
	} )
});

router.post('/setData',function(req,res){
 var data=req.body;
 var add=new ytsData(data);
 add.save();
 res.json(add);

})

module.exports = router;
