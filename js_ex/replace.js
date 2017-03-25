var a=172028163945;
var str=[];
while(a!=0)
{
	str.push(parseInt(a%10));
	a=parseInt(a/10);
}
for(let i=0;i<str.length-1;i++)
	if(str[i]%2==0&&str[i+1]%2==0)
		str.splice(i+1,0,'-');
function toString(arg) {
	let str1="";
	for(let i=0;i<arg.length;i++)
			str1+=arg[i];
		return str1;
}
a=str.reverse();
	console.log(toString(a));
