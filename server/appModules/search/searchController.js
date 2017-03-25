'use strict';
const searchModel = require('./searchEntity').searchModel;
const jobModel = require('../job/jobEntity').jobModel;
const Request = require('superagent');
const storeURL = function(id, callback) {  
  const jobID = {
    _id: id
  };
  jobModel.findOne(jobID, function(err, jobDetails) {
    if (err) {
      return callback(err, {});
    }

    if (!jobDetails) {
      return callback('job not available or not found..!', {});
    }

    let key=["AIzaSyDY5SnIb4vsmGwteTes7VPbi_1_TFV-T1U"];
    let engID=["009216953448521283757:ibz3hdutpom"];
    let start=1;
    let searchResults=[];
    let  count=0;
    for(let i=start;i<=91;i+=10)
    {
      let url="https://www.googleapis.com/customsearch/v1?q="+jobDetails.query+"&cx="+engID[0]+"&key="+key[0]+"&start="+i;
      Request
      .get(url)
      .end(function(err,body)
      {
        let data = JSON.parse(body.text);
        //console.log(data);
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
            }
          });
        }
        if(i==91){
          console.log("jsons saved");
          return callback(null, {'msg':'saved','content saved':100,'searchTerm':jobDetails.query});
        }
      });
    }

  });
};

module.exports = {
  storeURL: storeURL
};


