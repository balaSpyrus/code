

var query=["devops","html","css","js","json","react","angular","google","facebook","twitter"];
var key=["AIzaSyC7XMsUPGIaHo1rT0nIAYWuQZGNEZdRabs"];
var engID=["007705081896440677668:8luezkczozo"];
var start=1;
var count=0;
// <br><img src="+data.items[k].pagemap.cse_image[0].src+"/>
for (let j = 0; j < query.length; j++) {
	for(let i=start;i<=91;i+=10)
	{
		$.get("https://www.googleapis.com/customsearch/v1?q="+query[j]+"&cx="+engID[0]+"&key="+key[0]+"&start="+i,function(data)
		{
			for (let k = 0; k < data.items.length; k++) {
				$('#root').append("<p> <a href="+data.items[k].title+">"+data.items[k].link+"</a> url count : "+(++count)+"</p>");
				
			}
		})
	}
}
console.log(count);
