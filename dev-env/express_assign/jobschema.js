var mongoose = require('mongoose');
var CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

var AddJobSchema = mongoose.Schema({
	jobID:String,
     query: String,
     engineID:String,
     apiKey:String,
     extactTerms:String,
     no_of_results:Number,
     SiteSearch:String

});

AddJobSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'jobID'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.jobID = counter.seq;
        next();
    });
});

var AddJob = mongoose.model('jobs', AddJobSchema);
module.exports=AddJob;
