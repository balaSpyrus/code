var express = require('express');

var bodyParser=require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//adding all the route modules
var entryMod = require('./entryModule.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/User');
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
app.use('/',entryMod);


//app.use('/searchJobResult', sendJobList);

app.listen(8081, function () {
	console.log('Example app listening on port 8081!');
});