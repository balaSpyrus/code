var readline = require('readline');
var fs = require('fs');
var count=0;
headers=[];
var json = [];
var read = readline.createInterface({
	input: fs.createReadStream('1.csv')
});
read.on('line',function(line){
	if(count==0)
	{
		headers=line.split(",");
		count++;
	}
	else
	{
		var tmparr=[]; 
		row = line.split(",")
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
}
});
read.on("close",function()
{
	var read2 = readline.createInterface({
		input: fs.createReadStream('2.csv')
	});
	read2.on('line',function(line)
	{
		if(count==0)
		{
			headers=line.split(",");
			count++;
		}
		else
		{
			var tmparr=[]; 
			row = line.split(",")
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
}
});
	read2.on("close",function()
	{
		var read3 = readline.createInterface({
			input: fs.createReadStream('3.csv')
		});

		read3.on('line',function(line){
			if(count==0)
			{
				headers=line.split(",");
				count++;
			}
			else
			{
				var tmparr=[]; 
				row = line.split(",")
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
}
});
		read3.on("close",function()
		{
			var jsonConvert=[];
			var x=15;
			for(let i=0;i<json[0].length;i++)
			{
				var tmp={};
				tmp["catogories"]=headers[x].substring(20,headers[x].length-10);
				tmp["population"]=json[0][i];
				jsonConvert.push(tmp);
				x+=3;
			}
//console.log(jsonConvert);
fs.writeFileSync("C_Data.json", JSON.stringify(jsonConvert), 'utf8', 
	function(err){console.log(err);});
});
	});
});