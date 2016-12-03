var schema =require('../model/addJobSchema')
var router = require('express').Router();


var faa= new schema();
console.log("in delete api");
router.delete('/', function (req, res) {
	console.log(req.body._id);
	schema.remove({ _id: req.body._id}, function(err) {
        if (err)
            res.send(err)
        else
            { var msg={
               "msg":"deleted"
           }
           res.send();
       }
   });
});
module.exports = router
