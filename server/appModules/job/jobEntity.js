var mongoose = require('mongoose');
var AddJobSchema = mongoose.Schema;
var addjob=new AddJobSchema({

	query: String,
	engineID:String,
	extactTerms:String,
	results:Number,
	siteSearch:String

}, {collection: 'Job', versionKey: false});

const model = mongoose.model('Job', addjob);

module.exports = {
	jobModel: model
};
