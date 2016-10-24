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
}
});
		read3.on("close",function()
		{
			var jsonConvert=[];
			for(let i=0;i<json.length;i++)
			{
				var tmp={};
				tmp[headers[3]]=json[i][0];
				tmp[headers[40]]=json[i][1];
				tmp[headers[41]]=json[i][2];
				jsonConvert.push(tmp);
			}
//console.log(jsonConvert);
fs.writeFileSync("B_Data.json", JSON.stringify(jsonConvert), 'utf8', 
	function(err){console.log(err);});
});
	});
});