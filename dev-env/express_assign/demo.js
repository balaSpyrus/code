var express = require('express');
var app = express();
var bodyparser= require('body-parser');
app.use(bodyparser.json());

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})
app.post('/', function(req,res){
	console.log(req.body)
	res.send(req.body);
})
app.listen(8080, function(req,res){
	console.log("listening on port 8080")
})

// POST method route
