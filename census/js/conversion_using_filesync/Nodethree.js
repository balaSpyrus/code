var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../../csv/1.csv');
var filePath1 = path.join(__dirname, '../../csv/2.csv');
var filePath2 = path.join(__dirname, '../../csv/3.csv');
// Read CSV
var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

// Split on row
f = f.split("\n");

// Get first row for column headers
headers = f.shift().split(",");

var json = []; 

f.forEach(function(d)
{
    // Loop through each row  
    var tmparr=[]; 
    row = d.split(",")
    if(row[5]=="All ages" && row[4]=="Total")
    {
    	for(let i = 15; i <= 42; i+=3)
         tmparr.push(parseInt(row[i]));
    // Add object to list 

    if(json.length!=0)
        for(let j=0;j<tmparr.length;j++)
            json[0][j]=json[0][j]+tmparr[j];
        else
            json.push(tmparr);
    }
});

var f = fs.readFileSync(filePath1, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

// Split on row
f = f.split("\n");
f.shift();
f.forEach(function(d)
{ // Loop through each row  
    var tmparr=[]; 
    row = d.split(",")
    if(row[5]=="All ages" && row[4]=="Total")
    {
        for(let i = 15; i <= 42; i+=3)
         tmparr.push(parseInt(row[i]));
    // Add object to list 

    if(json.length!=0)
        for(let j=0;j<tmparr.length;j++)
            json[0][j]=json[0][j]+tmparr[j];
        else
            json.push(tmparr);
    }
});
var f = fs.readFileSync(filePath2, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

// Split on row
f = f.split("\n");
f.shift();
f.forEach(function(d)
{
    // Loop through each row  
    var tmparr=[]; 
    row = d.split(",")
    if(row[5]=="All ages" && row[4]=="Total")
    {
        for(let i = 15; i <= 42; i+=3)
         tmparr.push(parseInt(row[i]));
    // Add object to list 

    if(json.length!=0)
        for(let j=0;j<tmparr.length;j++)
            json[0][j]=json[0][j]+tmparr[j];
        else
            json.push(tmparr);
    }
});
var jsonConvert=[];
var x=15;
for(let i=0;i<json[0].length;i++)
{
    var tmp={};
    tmp["catogories"]=headers[x].substring(20,headers[x].length);
    tmp["population"]=json[0][i];
    jsonConvert.push(tmp);
    x+=3;
}
var outPath = path.join(__dirname, '../../json/C_data.json');
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(jsonConvert), 'utf8', 
    function(err){console.log(err);});