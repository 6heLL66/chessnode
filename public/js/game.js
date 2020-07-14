var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.4;
canvas.height = canvas.width;
canvas.style.marginTop ="100px";
canvas.style.marginRight = window.innerWidth * 0.2 + "px";
document.getElementById('state').style.right = window.innerWidth/1.8 + "px";
var size = canvas.width / 8;
var current = -1;
var team = "";
var turn = "white";
var startGame = false;

load();

canvas.onclick = function(e){
	if(startGame == false || team == "spectator")return 0;
	if(turn != team)return 0;
	let x = e.clientX - canvas.getBoundingClientRect().left;
	let y = e.clientY - canvas.getBoundingClientRect().top;
	let y1 = Math.floor(y / canvas.width * 10 * 0.8) + 1 ;
	let x1 = Math.floor(x / canvas.width * 10 * 0.8) + 1 ;
	if(current == -1 && !findF(x1,y1)){}
	else if (current == -1 && findF(x1,y1)){
		if(findF(x1,y1).figure.team != team)return 0;
		current = findF(x1,y1).figure;
	}
	else if (current != -1 && findF(x1,y1)){
		if(findF(x1,y1).figure.team == current.team){
			current = findF(x1,y1).figure;
		}
		else if(current.func(x1,y1)){
			stepK(x1,y1);
		}
	}
	else if (current != -1 && !findF(x1,y1)){
		if(current.name == "king"){
			if(current.func(x1,y1,checkShah(current.team))){
				step(x1,y1);	
			}	
		}
		else if(current.func(x1,y1)){
			step(x1,y1);
		}
		else current = -1;
	}
}

