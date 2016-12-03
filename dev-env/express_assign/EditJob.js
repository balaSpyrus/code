var schema =require('./Schema')
var router = require('express').Router();
router.put('/jobEdit', function(req, res) {

        // use our bear model to find the bear we want
        Schema.findById(req.body.jobID, function(err, schema) {

            if (err)
                res.send(err);




                var jobs=new schema();
   
   jobs.query=req.body.query;
   jobs.engineID=req.body.engineID;
   jobs.apiKey=req.body.apiKey;
   jobs.extactTerms=req.body.extactTerms;
   jobs.extactTerms=req.body.extactTerms;

            
            jobs.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Jobs updated!' });
            });

        });
    });