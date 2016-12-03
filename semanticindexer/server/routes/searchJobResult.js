var Request = require('superagent');
var mongoose = require('mongoose');
var ResultSchema = require('../model/resultSchema.js');
var Job = require('../model/addJobSchema.js');
var router = require('express').Router();
var ObjectId = (require('mongoose').Types.ObjectId);


router.get("/:jobID",function (req, resp) {

  console.log(req.params.jobID);
  Job.findOne({_id:req.params.jobID}, function (err, doc){

    console.log(doc.query);
    ResultSchema.findOne({jobId:req.params.jobID}, function (err, doc1){
    //console.log(doc1.query);
    if(doc1===null || doc.query!=doc1.query||doc.exactTerms!=doc1.exactTerms||doc.siteSearch!=doc1.siteSearch)
    {
      var key=["AIzaSyDY5SnIb4vsmGwteTes7VPbi_1_TFV-T1U"];
      var engID=["009216953448521283757:ibz3hdutpom"];
      var start=1;
      var count=0;
      var searchResults=[];
      var  searchResult={};
      var intents=[{basic: 0,
       tutorial: 0,
       theory: 0,
       manual:0,
       completeReference:0}];

       for(let i=start;i<11;i+=10)
       {
        let url="https://www.googleapis.com/customsearch/v1?q="+doc.query+"&cx="+engID[0]+"&key="+key[0]+"&start="+i;
        Request
        .get(url)
        .end(function(err,body)
        {
          data = JSON.parse(body.text);
          console.log("inside response");
          console.log(data);

          for (let k = 0; k < data.items.length; k++) {



            searchResult={"title":data.items[k].title,"url":data.items[k].link,"description":data.items[k].snippet,intent:intents};
            console.log(searchResult);
            searchResults.push(searchResult);
          }


          var Result = new ResultSchema({
            jobId:req.params.jobID,
            query:doc.query,
            exactTerms: doc.exactTerms,
            siteSearch: doc.siteSearch,
            searchResults: searchResults});

          Result.save(function (err) {
            if (err) {
              return err;
            }
            else {
              console.log("Post saved");
            }
          });
          resp.send(Result);

        });
      }

    }
    else
    {
     resp.send(doc1);
   }


 });

  });

});
module.exports = router;
