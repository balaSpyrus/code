var http = require('http');
var morgan = require('morgan');
var express = require('express');
const bodyParser = require('body-parser');

var empRoutes = require('./appserver/employee/employeeRouter');
var empProjectRoutes = require('./appserver/empProjects/empProjectRouter');
var empTravelsRoutes = require('./appserver/empTravels/empTravelsRouter');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var server = http.createServer(app);
server.listen(8080);

console.log("Server started...");

app.get("/", function(req, res) {
  res.json({
    'hi': 'bi'
  });
});


//Example of mounting multiple middleware (non-isolated) at the same mount point
app.use("/employee", empRoutes, empProjectRoutes, empTravelsRoutes);

/*app.use("/employee", empRoutes);
app.use('/employee/:empid/projects', empProjectRoutes);
app.use('/employee/:empid/travels', empTravelsRoutes);
*/
module.exports = app;