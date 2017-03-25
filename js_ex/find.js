function find(a,b)
{
	var count=0;
	for (var i = 0; i < a.length; i++) {
		if(a.charAt(i)==b)
			count++;
	}
	return count;
}
console.log("the letter \"a\" occurs in balasubrmanian is "+find("balasubramanian",'a'));
