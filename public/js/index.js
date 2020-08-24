document.getElementById("cross").onclick = function () {
	document.getElementById('modal').style.display = 'none';
}
document.getElementById("btn").onclick = function () {
	document.getElementById('modal').style.display = 'flex';
}

document.getElementById("white").onclick = function(e){
	if(e.target.choosed == "yes")return 0;
	e.target.setAttribute("choosed" , "yes");
	e.target.style.backgroundColor = "green";
	document.getElementById("black").setAttribute("choosed" , "no");
	document.getElementById("black").style.backgroundColor = "white";
}
document.getElementById("black").onclick = function(e){
	if(e.target.choosed == "yes")return 0;
	e.target.setAttribute("choosed" , "yes");
	e.target.style.backgroundColor = "green";
	document.getElementById("white").setAttribute("choosed" , "no");
	document.getElementById("white").style.backgroundColor = "white";
}
document.getElementById("send").onclick = function (){
	let team;
	fetch("/clearCookie")
	if(document.getElementById("white").getAttribute("choosed") == "yes")team = "white";
	else team = "black";
	let name = document.getElementById("name").value;
	if(name.length == 0 || name.length > 16){
		console.log("smth wrong with name");
		return 0;
	}
	let data = {
		name : name,
		team : team,
		players : {white : "",black : ""},
		spectators : [],
		key : createKey(15),
		state : [],
		mirror : "black",
		turn : "white",
		dead: {
			white: [],
			black: []
		}
	};
	if(data.team == "white")data.players.white = "first"
    else data.players.black = "first";
	createGame(data);
}
//socket
socket.on("message", function (message){
	let msg = JSON.parse(message);
	if(msg.do == "sendGames"){
		let games = msg.data;
		for(let i = 0;i < games.length;i++){
			addGame(games[i]);
		}
	}
	if(msg.do == "mes"){
		console.log(msg.data);
	}
})
function getGames (){
	socket.emit("getGames")
}
getGames();
function createGame(data){
	socket.emit("makeGame",data);
	window.location.href = '/game?key=' + data.key;
}
function addGame(game){
	let div = document.createElement("div");
	div.setAttribute("data",JSON.stringify(game));
	div.setAttribute("class","game");

	let name = document.createElement("div");
	name.setAttribute("class","game_name");
	name.innerText = game.name;

	let players = document.createElement("div");
	players.setAttribute("class","game_players");
	players.innerText = (game.players.white == "" || game.players.black == "" ? "1" : "2") + "/2";

	div.onclick = function (e){
		window.location.href = '/game?key=' + JSON.parse(e.target.parentNode.getAttribute("data")).key;
	};

	div.append(name);
	div.append(players);
	document.getElementById('games').append(div);
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