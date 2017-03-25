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
    if(row[4]=="Total")
    {
    	for(let i = 0; i < headers.length; i++)
         if(i==3)
           tmparr.push(row[i]);
       else if(i==40) 
        tmparr.push(parseInt(row[i]));
    else if(i==41)
        tmparr.push(parseInt(row[i]));
    // Add object to list 

    if(json.length!=0)
    {
        let flag=0;
        let idx=-1;
        for(let j=0;j<json.length;j++)
        {
            if(json[j].includes(tmparr[0])==true)
            { 
                flag=1;
                idx=j;
                break;
            }
        }
        if(flag==1)
        {
            json[idx][1]=json[idx][1]+tmparr[1];
            json[idx][2]=json[idx][2]+tmparr[2];
        }
        else
          json.push(tmparr);  
  }
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
{
    // Loop through each row  
    var tmparr=[]; 
    row = d.split(",")
    if(row[4]=="Total")
    {
        for(let i = 0; i < headers.length; i++)
         if(i==3)
           tmparr.push(row[i]);
       else if(i==40) 
        tmparr.push(parseInt(row[i]));
    else if(i==41)
        tmparr.push(parseInt(row[i]));
    // Add object to list 

    if(json.length!=0)
    {
        let flag=0;
        let idx=-1;
        for(let j=0;j<json.length;j++)
        {
            if(json[j].includes(tmparr[0])==true)
            { 
                flag=1;
                idx=j;
                break;
            }
        }
        if(flag==1)
        {
            json[idx][1]=json[idx][1]+tmparr[1];
            json[idx][2]=json[idx][2]+tmparr[2];
        }
        else
          json.push(tmparr);  
  }
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
    if(row[4]=="Total")
    {
        for(let i = 0; i < headers.length; i++)
         if(i==3)
           tmparr.push(row[i]);
       else if(i==40) 
        tmparr.push(parseInt(row[i]));
    else if(i==41)
        tmparr.push(parseInt(row[i]));
    // Add object to list 

    if(json.length!=0)
    {
        let flag=0;
        let idx=-1;
        for(let j=0;j<json.length;j++)
        {
            if(json[j].includes(tmparr[0])==true)
            { 
                flag=1;
                idx=j;
                break;
            }
        }
        if(flag==1)
        {
            json[idx][1]=json[idx][1]+tmparr[1];
            json[idx][2]=json[idx][2]+tmparr[2];
        }
        else
          json.push(tmparr);  
  }
  else
    json.push(tmparr);
}
});
var jsonConvert=[];
for(let i=0;i<json.length;i++)
{
    var tmp={};
    tmp[headers[3]]=json[i][0];
    tmp[headers[40]]=json[i][1];
    tmp[headers[41]]=json[i][2];
    jsonConvert.push(tmp);
}
var outPath = path.join(__dirname, '../../json/B_data.json');
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(jsonConvert), 'utf8', 
    function(err){console.log(err);});