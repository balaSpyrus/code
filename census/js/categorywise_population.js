var readline = require('readline');
var fs = require('fs');
var count=false;
var headers=[],json = [];
var allage=5,total=4,range1=15,range2=42,inc=3;
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
		if(row[allage]=="All ages" && row[total]=="Total")
		{
			for(let i = range1; i <= range2; i+=inc)
				tmparr.push(parseInt(row[i]));
    		// Add object to list    
    		if(json.length!=0)
    		{
    			for(let j=0;j<tmparr.length;j++)
    				json[j]+=tmparr[j];
    		}
    		else
    			json=tmparr;
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

			var jsonConvert=[];
			var x=range1;
			json.forEach(function(d)
			{
				var tmp={};
				tmp["catogories"]=headers[x].substring(20,headers[x].length-10);
				tmp["population"]=d;
				jsonConvert.push(tmp);
				x+=inc;
			})
			fs.writeFileSync("../json/categorywise_population.json", JSON.stringify(jsonConvert), 'utf8', 
				function(err){console.log(err);});
		});
	});
});