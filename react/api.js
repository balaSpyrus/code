var query=["devops"];
var key=["AIzaSyAkZ_luP7pNchE_V2EMeiw2AwE7kKmbQVY"];
var engID=["009216953448521283757:f-nqohhuzh0"];
var start=1;
var count=0;
for (let j = 0; j < query.length; j++) {
	for(let i=start;i<=91;i+=10)
	{
		$.get("https://www.googleapis.com/customsearch/v1?q="+query[j]+"&cx="+engID[0]+"&key="+key[0]+"&start="+i,function(data)
		{
			for (let k = 0; k < data.items.length; k++) {
				$('#root').append("<p> <a href="+data.items[k].title+">"+data.items[k].link+"</a> <br><img src="+data.items[k].pagemap.cse_image[0].src+"/>url count : "+(++count)+"</p>");
				
			}
		})
	}
}
console.log(count);
