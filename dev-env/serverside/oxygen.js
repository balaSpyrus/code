var express = require('express');
var oxygen = require('./router')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb');
var bodyParser = require('body-parser')

var app = express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	console.log("you have been connected to jobs db successfully")
});

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json());

app.use('/', oxygen);

app.listen(8080);

