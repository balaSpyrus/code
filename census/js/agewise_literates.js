var readline = require('readline');
var fs = require('fs');
var count=false;
var headers=[],json = [];
var total=4,age=5,population=12;
var read = readline.createInterface({
	input: fs.createReadStream('../csv/1.csv')
});
//common function
function operate(line)
{
	if(count==false)
	{
		headers=line.split(",");
		count=true;
	}
	else
	{
		var tmparr=[]; 
		row = line.split(",")
		if(row[total]=="Total")
		{
			for(let i = 0; i < headers.length; i++)
			{
				if(i==age)
					tmparr.push(row[i]);
				else if(i==population) 
					tmparr.push(parseInt(row[i]));
			}

    		// Add object to list 
    		if(json.length!=0)
    		{
    			let flag=false;
    			json.forEach(function(d)
    			{    	
    				if(d[0].includes(tmparr[0])==true)
    				{     							
    					flag=true;
    					d[1]+=tmparr[1];
    				}    						
    			})
    			if(flag==false)
    				json.push(tmparr);
    		}
    		else
    			json.push(tmparr);
    	}
    }
}
read.on('line',function(line){
	operate(line);
});
read.on("close",function()
{
	var read2 = readline.createInterface({
		input: fs.createReadStream('../csv/2.csv')
	});
	read2.on('line',function(line)
	{
		operate(line);
	});
	read2.on("close",function()
	{
		var read3 = readline.createInterface({
			input: fs.createReadStream('../csv/3.csv')
		});
		read3.on('line',function(line){
			operate(line);
		});
		read3.on("close",function()
		{
			json.shift();
			var jsonConvert=[];
			json.forEach(function(d)
			{
				var tmp={};
				tmp[headers[age]]=d[0];
				tmp[headers[population].substring(0,headers[population].length-10)]=d[1];
				jsonConvert.push(tmp);
			})
			fs.writeFileSync("../json/agewise_literates.json", JSON.stringify(jsonConvert), 'utf8', 
				function(err){console.log(err);});
		});
	});
});