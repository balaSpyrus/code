const request=require('request');


request('https://en.wikipedia.org/wiki/Technology', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var str=body.replace(/(<[^>]*>)/g, "")
		var arrColln=str.split(" ");
		var fs=[];
		arrColln.forEach(function(data){
			fs.push(data.replace(/[a-z0-9]+$/gi,""));
		})
console.log(fs) // Show the HTML for the Google homepage. 
}
})