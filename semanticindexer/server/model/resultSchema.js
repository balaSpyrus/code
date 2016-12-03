var mongoose=require("mongoose");
var Schema =mongoose.Schema;

var ResultSchema = mongoose.Schema({
  jobId: String,
  query: String,
  exactTerms: String,
  siteSearch: String,
  searchResults: [{url:String,
                     title: String,
                     description:String,
                     intent:[{basic: Number,
                                tutorial: Number,
                                theory: Number,
                                manual:Number,
                                completeReference:Number}]}]});

module.exports=mongoose.model('ResultSchema',ResultSchema,'ResultSchema');
