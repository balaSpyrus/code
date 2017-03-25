var schema =require('./schema')
var router = require('express').Router();
var mongodb = require('mongoose');
// mongodb.connect('mongodb://localhost/sampledb');



router.get('/show', function (req, res) {
  schema.job.find(function(err,data){
   if(err){
     res.send(err);
   }
   else{
    res.json(data);
  }
})


})
// define the about route
router.get('/', function (req, res) {
  res.send('HOME')
})
router.get('/about', function (req, res) {

  res.send('About oxygen')
})
router.post('/send',function(req,res){

  var foo=new schema.job();
  schema.counter.find(function(err,data){
   if(err){
     
   }
   else{
    var cnt=data;
  }
});
  console.log("body: ",cnt ,req.name);
  foo._id=cnt.seq;  
  foo.name=req.body.name;
  cnt.update({_id:"jobseq"}, {$inc: { seq: 1 }}, function(err,doc)
  {
    if(err)
      console.log(err)
    console.log(doc)

  });

  console.log(cnt.seq);
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







