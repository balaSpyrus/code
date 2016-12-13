'use strict';
let request=require('request');
const url='http://www.facebook.com';
var c;
var f=false;
var x=callback=>request(url,(err,response,body)=>{
	//console.log(body)
	callback(err,body);
});
x(function(err,res)
{

	console.log("inside")
	c=res
	f=true;
})
require('deasync').loopWhile(function(){return !f;});
console.log("hai")