var http =require('http');
var HttpDispatcher = require('httpdispatcher');
var fs =require('fs');
var dispatcher = new HttpDispatcher();

const PORT =8081;

function handleRequest(req,res){
  try {
    console.log('requested');
    dispatcher.dispatch(req,res);
  }catch(err){
    console.log(err);
  }

}

function renderHTML(path, res) {
  fs.readFile(path, null, function(error,data) {
   if(error) {
     res.writeHead(404);
     res.write('file not found');
   } else {
     res.write(data);
   }
   res.end('\nfile has been loaded');
 });
}
function writeFileAsync(file,data,res) {
  fs.writeFile(file, data, function (err) {
    if (err) throw err;
    console.log('File Saved');

  });
  renderHTML('submit.txt',res);
}

dispatcher.onGet("/employees",function(req, res){
 res.writeHead(200, {'Content-Type': 'text/html'});
 console.log('data is sent to the page');
 renderHTML('employees.txt',res);
});

dispatcher.onGet("/roles",function(req, res){
 res.writeHead(200, {'Content-Type': 'text/html'});
 console.log('data is sent to the page');
 renderHTML('roles.txt',res);
}); 
dispatcher.onGet("/departments",function(req, res){
 res.writeHead(200, {'Content-Type': 'text/html'});
 console.log('data is sent to the page');
 renderHTML('departments.txt',res);
});
dispatcher.onGet("/view",function(req, res){
 res.writeHead(200, {'Content-Type': 'text/html'});
 console.log('data is sent to the page');
 renderHTML('submit.txt',res);
}); 

dispatcher.onPost("/submit",function(req, res){
 res.writeHead(200, {'Content-Type': 'text/html'});
 console.log( req.body );
 writeFileAsync("submit.txt",req.body,res);
       //renderHTML('submit.txt',req.body);
     });

dispatcher.onError(function(req, res) {
 res.writeHead(404);
 res.end(' 404 error file not found');
});


var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("server is listening to the port %s",PORT);
});