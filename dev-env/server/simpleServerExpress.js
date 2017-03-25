var express= require('express');
var bodyParser= require('body-parser');
var path= require('path');

var app= express();


var obj1={"key": "xxx"};
var obj2={"value": "987"};
var obj3={"id":"qwerty"};
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
	console.log(req.body);   
	res.send(req.body);

});
//what is scalability
//how to make stateless servers



app.listen(3000, function(){
	console.log("server started on 3000 port");
});