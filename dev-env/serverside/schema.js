var mongoose = require('mongoose');
var jobSchema = mongoose.Schema({
	_id:Number,
	name: String
});
var counter = mongoose.Schema({
	_id: {type: String, default: "jobseq"},
	seq: {type: Number, default: 1}
});
module.exports= {
	job :mongoose.model('jobs', jobSchema),
	counter : mongoose.model('jobcounter', counter)
};

