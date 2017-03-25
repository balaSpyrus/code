var arr=[1,2,5,2,4,2,4,2,48,9,7,0];
for(let i=0;i<arr.length;i++)
	for(let j=i+1;j<arr.length;j++)
		if(arr[i]==arr[j])
			arr.splice(j,1);

console.log(arr);