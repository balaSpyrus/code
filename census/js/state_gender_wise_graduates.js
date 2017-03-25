var readline = require('readline');
var fs = require('fs');
var count=false;
var headers=[],json = [];
var total=4,area=3,males=40,females=41;
var read = readline.createInterface({
	input: fs.createReadStream('../csv/1.csv')
});
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
				if(i==area)
					tmparr.push(row[i]);
				else if(i==males) 
					tmparr.push(parseInt(row[i]));
				else if(i==females)
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
   						d[2]+=tmparr[2];
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
   read.on('line',function(line)
   {
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
   			var jsonConvert=[];
   			json.forEach(function(d)
   			{
   				var tmp={};
   				tmp["Area"]=d[0].substring(8,d[0].length);
   				tmp["Males"]=d[1];
   				tmp["Females"]=d[2];
   				jsonConvert.push(tmp);
   			})
   			fs.writeFileSync("../json/state_gender_wise_graduates.json", JSON.stringify(jsonConvert), 'utf8', 
   				function(err){console.log(err);});
   		});
   	});
   });