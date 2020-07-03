document.getElementById("cross").onclick = function () {
	document.getElementById('modal').style.display = 'none';
}
document.getElementById("btn").onclick = function () {
	document.getElementById('modal').style.display = 'flex';
}

document.getElementById("white").onclick = function(e){
	if(e.target.choosed == "yes")return 0;
	e.target.choosed = "yes";
	e.target.style.backgroundColor = "green";
	document.getElementById("black").choosed = "no";
	document.getElementById("black").style.backgroundColor = "white";
}
document.getElementById("black").onclick = function(e){
	if(e.target.choosed == "yes")return 0;
	e.target.choosed = "yes";
	e.target.style.backgroundColor = "green";
	document.getElementById("white").choosed = "no";
	document.getElementById("white").style.backgroundColor = "white";
}
document.getElementById("send").onclick = function (){
	let team;
	if(document.getElementById("white").choosed == "yes")team = "white";
	else team = "black";
	let name = document.getElementById("name").value;
	if(name.length == 0 || name.length > 16){
		console.log("smth wrong with name");
		return 0;
	}
	let data = {name : name,team : team, key : createKey(15)};
	fetch('/createGame', {
    	method: 'POST',
    	body: {'asd' : 2}
	})
  	.then(response => response.json())
  	.then(json => console.log(json))
		
	
}
function createKey(n){
	let res = "";
	let obj = {
		0 : "a",
		1 : "b",
		2 : "c",
		3 : "d",
		4 : "e",
		5 : "f",
		6 : "g",
		7 : "h",
		8 : "i",
		9 : "j",
		10 : "k",
		11 : "l",
		12 : "m",
		13 : "n",
		14 : "o",
		15 : "p",
		16 : "q",
		17 : "r",
		18 : "s",
		19 : "t",
		20 : "u",
		21 : "v",
		22 : "w",
		23 : "x",
		24 : "y",
		25 : "z",

	}
	for(let i = 0;i < n;i++){
		let num = Math.round(Math.random()+1);
		if(num == 1){
			num = Math.round(Math.random()*25);
			res += obj[num].toUpperCase();
		}
		else {
			num = Math.round(Math.random()*25);
			res += obj[num];
		}
	}
	return res;
}