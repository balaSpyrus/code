// My Custom JQuery
var pageNo=1;
function getMovie()
{
	$('#listheading div').remove();
	var tem=$('#searchInput').val().trim();
	var src="";
	var title="";
	var row='<div class="row">';
	$.ajax({
		type: 'GET',
			//url: 'http://www.omdbapi.com/?s='+tem,
			url:'http://www.omdbapi.com/?s=' + tem + '&page=' + pageNo,
			success : function (data) {
				if(data.Response!="False")
				{
					$.each(data['Search'], function(i, Title){			
						$("#head").html("<h3 style=\"letter-spacing:3px;text-align:center\"><b>MOVIES FOUND</b></h3><br><br>");		

						if(Title.Poster=='N/A')
							src="media/images/poster.png";					
						else
							src=Title.Poster.trim();

						title=Title.Title+" -  ( "+Title.Year+" )";		

						if(i==3||i==6||i==9)
						{
							$('#listheading').append(row+"<span>"+i+"</span></div>");
							row='<div class="row">';
							row+='<div class="col-sm-4"><img src="'+src+'" class="img-responsive" width="200" height="300"/><br><h5>'+title+'</h5></div>';
							if(i==9)
								$('#listheading').append(row+"<span>"+i+"</span></div>");
						}
						else
							row+='<div class="col-sm-4"><img src="'+src+'" class="img-responsive" width="200" height="300"/><br><h5>'+title+'</h5></div>';
						$(".pagination").attr("style","visibility:visible");
					});
				}
				else{
					$("#head").html("<h3 style=\"letter-spacing:3px;text-align:center\"><b>SORRY NO SUCH MOVIES FOUND</b></h3><br><br>");	
					$(".pagination").attr("style","visibility:hidden");
				}
				
			}

		});
	
}
$('#next').click(function(){
	pageNo++;
	getMovie()
});	
$('#previous').click(function(){
	if(pageNo > 1){
		pageNo--;
		getMovie()
	}
});		