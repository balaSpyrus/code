'use strict';

const logger = require('./../../applogger');
const searchModel = require('./searchEntity').searchModel;
const docSearchJobModel = require('./../docSearchJob/docSearchJobEntity').docSearchJobModel;
const Request = require('superagent');
const storeURL = function(id, callback) {  
  const jobID = {
    _id: id
  };
  docSearchJobModel.findOne(jobID, function(err, jobDetails) {
    if (err) {
      logger.error(
        "Encountered error at SearchController::docSearchJobModel, error: ",
        err);
      return callback(err, {});
    }

    if (!jobDetails) {
      logger.error("No such job Found");
      return callback('job not available or not found..!', {});
    }
    let engine=jobDetails.engineID.split(' ');
    console.log(engine);
    let engID=engine[0];
    let key=engine[1];
    let searchResults=[];
    let  count=0;
    for(let i=1;i<=91;i+=10)
    {

      let url="https://www.googleapis.com/customsearch/v1?q="+jobDetails.query+"&cx="+engID+"&key="+key+"&start="+i;
      Request
      .get(url)
      .end(function(err,body)
      {
        if(err)
          console.log(err);
        let data = JSON.parse(body.text);        
        for (let k = 0; k < data.items.length; k++) {
          if(count<jobDetails.results){  
            //console.log(count);
            let searchResult={query:jobDetails.query,url:data.items[k].link,title:data.items[k].title,description:data.items[k].snippet};
            searchResults.push(searchResult);
            let saveUrl=new searchModel(searchResult);
            saveUrl.save(function (err) {
              if (err) {
                console.log(err);
              }
             // console.log("savedd "+(count));
           });
            count++;
          }
          else{
            i=100;
            break;
          }

        }   

        // if(i===100){
        //   console.log("jsons saved");
        //   return callback(null, {'count':count,'content':searchResults});
        // }
      });

    }
    

  });
};

module.exports = {
  storeURL: storeURL
};


