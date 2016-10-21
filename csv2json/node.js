var Converter = require("csvtojson").Converter;

var fs=require("fs"); 
//CSV File Path or CSV String or Readable Stream Object
var csvFileName="India2011.csv";
var x;
//new converter instance
var csvConverter=new Converter({});

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
   x= jsonObj; //here is your result json object
});

//read from file
var wrt=fs.createWriteStream('dat.json');
fs.createReadStream(csvFileName).pipe(csvConverter);
console.log(x);