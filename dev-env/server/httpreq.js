
module.exports={"keys":function(req,res){
	res.writeHead(200,{'content-type':'application/json'})
	var json1={
		name:"anonymous",
		key:"123456789"
	}
	var json2={
		name:"employee",
		key:"123456789123456789"
	}
	var json3={
		name:"department",
		key:"123456789987654321"
	}
	res.write(req.url=='/'?JSON.stringify(json1):(req.url=='/employees'?(req.method=='POST'?JSON.stringify({method:"post method"}):JSON.stringify(json2)):JSON.stringify(json3)));
	res.end();


},
new:function(req,res)
{
	res.end("sdfghjk")
}
}