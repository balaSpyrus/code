'use strict';

const logger = require('./../../applogger');
const searchModel = require('./searchEntity').searchModel;

const docSearchJobModel = require('./../docSearchJob/docSearchJobEntity').docSearchJobModel;
const Request = require('superagent');

const storeURL = function(id, callback) {  
  const query = {
    _id: id
  };
  
  docSearchJobModel.findOne(query, function(err, jobDetails) {
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

    let engine = jobDetails.engineID.split(' ');
    console.log('ingineee');
    let engID = engine[0];
    let key=engine[1];
    let engID1='015901048907159908775:smvnbdfg04y';
    let key1='AIzaSyDYnn-XuWfmWf4l3JCChyFyrJ4eXOCbSss';    
    let start=1;
    let searchResults=[];
    let  count=0;
    for(let i=start;i<=91;i+=10)
    {
      let url="https://www.googleapis.com/customsearch/v1?q="+jobDetails.query+"&cx="+engID1+"&key="+key1+"&start="+i;
      Request
      .get(url)
      .end(function(err,body)
      {
        if(err)
          console.log(body.text);
        let data = JSON.parse(body.text);
        
        for (let k = 0; k < data.items.length; k++) {
          let searchResult={"query":jobDetails.query,"title":data.items[k].title,"url":data.items[k].link,"description":data.items[k].snippet};
          
          searchResults.push(searchResult);
          let saveUrl=new searchModel(searchResult);
          saveUrl.save(function (err) {
            if (err) {
              console.log(err);
            }
            else {
              count++;
              console.log(count);
              if(count==jobDetails.results){

                console.log("jsons saved");
                i=100;
                k=10;
                return callback(null, {'count':count,'content':searchResults});
                
              }
            }
          });
        }

      });      
    }

  });
};

module.exports = {
  storeURL: storeURL
};


