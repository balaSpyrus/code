var val=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var email="bbalax.bbalax@gmail.com";
if(val.test(email)==true)
	console.log("valid");
else
	console.log("not valid");