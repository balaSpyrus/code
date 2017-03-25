var express= require('express');
var bodyParser= require('body-parser');
var path= require('path');
var mongoose = require('mongoose');
var schema = require('./schema')
mongoose.connect('mongodb://localhost/sampledb');

var app= express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	console.log("connected to the server");
});

app.listen(8081, function(){
	console.log("server starteddddd on 8081 port");
});

var obj1={key: "xxx"};
var obj2={key: "987"};
var obj3={key:"qwerty"};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/one', function(req, res)
{
	res.header("Content-Type", "application/json");
	res.send(obj1);
});
app.get('/', function(req, res)
{
	
	res.send("hai hello");
});
app.get('/two', function(req, res)
{
	res.header("Content-Type", "application/json");

	res.send(obj2);
});
app.post('/three', function(req, res)
{

	// var user_id = req.body.id;
	// var token = req.body.token;
	// var geo = req.body.geo;
	// res.send(user_id + ' ' + token + ' ' + geo);
	console.log(req.body.key);   
	var newone=new schema();
	newone.key=req.body.key;
	newone.save(function (err) {
		if (err)
			res.send(err);
		else
			res.send("data saved");
	});
	

});
//what is scalability
//how to make stateless servers



