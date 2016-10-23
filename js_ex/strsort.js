var str="balasubramanian";
var str1=str.split("");
str="";
str1.sort().map(function(a){str+=a;});
console.log(str);