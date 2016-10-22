var dateFormat = require('dateformat');
var date=new Date();
console.log(dateFormat(date,"mm/dd/yyyy"));
console.log((date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear());