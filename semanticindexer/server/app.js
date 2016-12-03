//adding all th required modules
var express = require('express');


//var schema =require('./model/AddJobSchema');
var bodyParser=require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//adding all the route modules
var SearchJobResult = require('./routes/searchJobResult.js');
var AddJob = require('./routes/addJob')
var DeleteJob=require('./routes/deleteJob')
var ShowJobs=require('./routes/show')

//setting up the databse connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/oxygen');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...:'));
db.once('open', function() {
	console.log("you have been connected successfully")
});

//allowing access to resources from outside
app.use(function(req,res,next)
{
	res.header('Access-Control-Allow-Origin',"*");
	res.header('Access-Control-Allow-Method','GET,POST,PUT,DELETE');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

// parse application/json
app.use(bodyParser.json());

//mounting the routes
app.use('/searchJobResult', SearchJobResult);
app.use('/job', AddJob);
app.use('/delete', DeleteJob);
app.use('/show', ShowJobs);


//app.use('/searchJobResult', sendJobList);

app.listen(8081, function () {
	console.log('Example app listening on port 8081!');
});
