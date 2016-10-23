var arr1=[1,3,5,4,6,8,6,7,5,4,6,3];
var arr2=[9,3,49,5,3,21,4,3,1];
if (arr1.length>arr2.length) {
	for (var i = 0; i <arr1.length; i++) {
		if (arr2[i]!=undefined)
			console.log(arr1[i]-arr2[i]);
		else
			console.log(arr1[i]);
	}
} 
else {
	for (var i = 0; i < arr2.length; i++) {
		if(arr1[i]!=undefined)
			console.log(arr2[i]-arr1[i]);
		else
			console.log(arr2[i]);
	}
}
