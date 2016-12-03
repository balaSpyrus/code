var schema =require('./jobschema');
var router = require('express').Router();



router.post('/',function(req,res){
   console.log("body: ", req.body);
 var foo=new schema();
   foo.jobID=req.body.jobID;
     foo.query=req.body.query;
 
   

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