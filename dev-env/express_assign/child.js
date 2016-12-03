var express = require('express');
var oxygen = require('./ex')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/oxygen');
var bodyParser = require('body-parser')

var app = express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("you have been connected successfully")
});

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

app.use('/oxy', oxygen)

app.listen(8080);