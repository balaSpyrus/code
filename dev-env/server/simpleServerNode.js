var http=require('http');
var mode=require('./httpreq')
var s=http.createServer(mode.keys).listen(8080,function(){console.log("server running")});