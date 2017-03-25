var addJob =require('../model/addJobSchema');
var router = require('express').Router();



router.post('/',function(req,res){
 var j=req.body.job;
 var add=new addJob({
     query: j.query,
     engineID:j.engineID,
     extactTerms:j.extactTerms,
     results:j.results,
     siteSearch:j.siteSearch
});
 add.save();
 res.send(add);

});

module.exports = router
