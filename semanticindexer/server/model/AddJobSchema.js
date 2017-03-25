var mongoose = require('mongoose');
var AddJobSchema = mongoose.Schema;
     var addjob=new AddJobSchema({
    
     query: String,
     engineID:String,
     extactTerms:String,
     results:Number,
     siteSearch:String

});

var AddJob = mongoose.model('AddJob', addjob,'Job');
module.exports=AddJob;