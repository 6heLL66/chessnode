var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
if (window.innerWidth > 981) {
	canvas.width = window.innerWidth * 0.42;
	canvas.style.marginRight = window.innerWidth * 0.2 + "px";
}
else {
	canvas.width = window.innerWidth * 0.9;
	canvas.style.marginRight = window.innerWidth * 0.05 + "px";
}
canvas.height = canvas.width;
canvas.style.marginTop ="100px";

document.getElementById('state').style.right = window.innerWidth/2 - document.getElementById('state').innerWidth + "px";
var size = canvas.width / 8;
var current = -1;
var team = "";
var turn = "white";
var startGame = false;

load();

canvas.onclick = onClick
canvas.onmousedown = mouseDown


function onClick(e) {
	if (startGame == false || team == "spectator") return false;
	if (turn != team) return false;

	let x = e.clientX - canvas.getBoundingClientRect().left;
	let y = e.clientY - canvas.getBoundingClientRect().top;
	let y1 = Math.floor(y / canvas.width * 10 * 0.8) + 1 ;
	let x1 = Math.floor(x / canvas.width * 10 * 0.8) + 1 ;

	if (current == -1 && !findF(x1,y1)) {}
	else if (current == -1 && findF(x1,y1)) {
		if(findF(x1,y1).figure.team != team)return false;
		current = findF(x1,y1).figure;
		return false
	}
	else if (current != -1 && findF(x1,y1)) {
		if(findF(x1,y1).figure.team == current.team){
			current = findF(x1,y1).figure;
			return false
		}
		else if(current.func(x1,y1)) {
			stepK(x1,y1);
			return true
		}
	}
	else if (current != -1 && !findF(x1,y1)) {
		if(current.name == "king"){
			if(current.func(x1,y1,checkShah(current.team))){
				step(x1,y1);
				return true	
			}	
		}
		else if(current.func(x1,y1)) {
			step(x1,y1);
			return true
		}
		else current = -1;
	}
}

function mouseDown(e) {
	canvas.style.cursor = "grabbing"
	let x = e.clientX - canvas.getBoundingClientRect().left
	let y = e.clientY - canvas.getBoundingClientRect().top
	let y1 = Math.floor(y / canvas.width * 10 * 0.8) + 1 
	let x1 = Math.floor(x / canvas.width * 10 * 0.8) + 1
	if (!findF(x1, y1)) return 0
	if (findF(x1, y1).figure.team != team) return 0
	let figure = findF(x1, y1).figure
	let choosed = true
	current = figure
	canvas.onmousemove = (e) => {
		if (choosed == false) return 0
		console.log(x, e.clientX - canvas.getBoundingClientRect().left)
		let delx = Math.round(e.clientX - canvas.getBoundingClientRect().left - x)
		let dely = Math.round(e.clientY - canvas.getBoundingClientRect().top - y)
		console.log(delx, dely)
		figure.visPos.x += delx
		figure.visPos.y += dely
		draw()
		x = e.clientX - canvas.getBoundingClientRect().left
		y = e.clientY - canvas.getBoundingClientRect().top
	}
	canvas.onmouseup = (e) => {
		canvas.style.cursor = "default"
		figure.visPos.x = 0
		figure.visPos.y = 0
		if(e.clientX < canvas.width + canvas.getBoundingClientRect().left
			&& e.clientX > canvas.getBoundingClientRect().left
			&& e.clientY < canvas.height + canvas.getBoundingClientRect().top - 2
			&& e.clientY > canvas.getBoundingClientRect().top) {
		}
		else {
			draw()
			choosed = false
			current = -1
			return 0
		}
		if (onClick(e)){
			draw()
		} 
		else {
			draw()
		}
		choosed = false
		current = -1
	}
}

