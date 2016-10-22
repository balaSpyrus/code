var a=[111,32,512,5,222];
var max=0;
for( var val in a)
	if(a[val]>max)
		max=a[val]
		console.log("the maximum value : "+max);