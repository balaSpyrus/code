var obj = 
[{'name':'Saurabh', 'age': 30, 'occupation': "Team Leader"},
{'name':'Anupriya', 'age': 32, 'occupation': "Team Leader"},
{'name':'Kalyani', 'age': 25, 'occupation': "Programmer"},
{'name':'Damodaran', 'age': 27, 'occupation': "Programmer"},
{'name':'Krishnakath', 'age': 22, 'occupation': "Programmer"},
{'name':'Venketraman', 'age': 28, 'occupation': "Programmer"}];
for (var i = 0; i < obj.length; i++) {
	if(obj[i].occupation=="Programmer")
	{
		console.log(obj[i]);
	}
}
for (var i = 0; i < obj.length; i++) {
	for (var j = i+1; j < obj.length; j++) {
		if(obj[i].age<obj[j].age)
		{
			var temp=obj[i];
			obj[i]=obj[j];
			obj[j]=temp;
		}
	}
}
console.log("\n\n");
console.log(obj);