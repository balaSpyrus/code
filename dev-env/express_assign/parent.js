

var schema =require('./schema')
var router = require('express').Router();

router.get('/', function (req, res) {
	schema.find(function(err,data){
    console.log("we are here")
		if(err){
			res.send(err);
		}
		else{
          res.json(data);
		}
	})
 
})
// define the about route
router.get('/about', function (req, res) {

  res.send('About oxyen')
})
router.post('/',function(req,res){
   console.log("body: ", req.body);
   var foo=new schema();
   foo.name=req.body.name;

  foo.save(function (err) {
  if (err){
  	res.send(err);
  } 
  else{
  	var data={
         msg:"your records save successfully"
  	}
  	res.json(data);

  }
});
   

});

module.exports = router
