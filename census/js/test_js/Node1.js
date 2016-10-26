var fs = require('fs');
var path = require('path');


var filePath = path.join(__dirname, '1.csv');
//var filePath1 = path.join(__dirname, '2.csv');
//var filePath2 = path.join(__dirname, '3.csv');
// Read CSV
var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

// Split on row
f = f.split("\n");

// Get first row for column headers
headers = f.shift().split(",");

var json = [];    
f.forEach(function(d){
    // Loop through each row
    tmp = {}
    row = d.split(",")
    for(var i = 0; i < headers.length; i++){
        tmp[headers[i]] = row[i];
    }
    // Add object to list
    json.push(tmp);
});

f = fs.readFileSync(filePath1, {encoding: 'utf-8'}, 
    function(err){console.log(err);});
f = f.split("\n");
headers = f.shift().split(",");
f.forEach(function(d){
    // Loop through each row
    tmp = {}
    row = d.split(",")
    for(var i = 0; i < headers.length; i++){
        tmp[headers[i]] = row[i];
    }
    // Add object to list
    json.push(tmp);
});
f = fs.readFileSync(filePath2, {encoding: 'utf-8'}, 
    function(err){console.log(err);});
        f = f.split("\n");
headers = f.shift().split(",");
f.forEach(function(d){
    // Loop through each row
    tmp = {}
    row = d.split(",")
    for(var i = 0; i < headers.length; i++){
        tmp[headers[i]] = row[i];
    }
    // Add object to list
    json.push(tmp);
});
var outPath = path.join(__dirname, 'data.json');
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8', 
    function(err){console.log(err);});