var buffer = []
var rules = {
	"bP" : function(x,y){
			if(findF(x,y) && ((this.pos.x + 1 == x && this.pos.y - 1 == y) || (this.pos.x - 1 == x && this.pos.y - 1 == y))){
				return true;
			}
			if(this.steps == 0 && this.pos.x == x && (this.pos.y == (y + 1) || this.pos.y == (y + 2))){
				if(this.pos.y > y){
					for(let i = this.pos.y - 1;i >= y;i--){
						if(findF(this.pos.x,i))return false;
					}
				}
				return true;	
			}
			else if (this.steps != 0 && this.pos.x == x && this.pos.y == y + 1){
				if(findF(this.pos.x,this.pos.y - 1))return false;
				return true;	
			}
			return false;
	},
	"wP" : function(x,y){
			if(findF(x,y) && ((this.pos.x + 1 == x && this.pos.y + 1 == y) || (this.pos.x - 1 == x && this.pos.y + 1 == y))){
				return true;
			}
			if(this.steps == 0 && this.pos.x == x && (this.pos.y == y - 1 || this.pos.y == y - 2)){
				if(this.pos.y < y){
					for(let i = this.pos.y + 1;i <= y;i++){
						if(findF(this.pos.x,i))return false;
					}
				}
				return true;	
			}
			else if (this.steps != 0 && this.pos.x == x && this.pos.y == y - 1){
				if(findF(this.pos.x,this.pos.y + 1))return false;
				return true;	
			}
			return false;
	},
	"rook" : function (x,y){
				if(x != this.pos.x && y == this.pos.y){
					if(this.pos.x < x){
						for(let i = this.pos.x + 1;i < x;i++){
							if(findF(i,this.pos.y))return false;
						}
					}
					else if(this.pos.x > x){
						for(let i = this.pos.x - 1;i > x;i--){
							if(findF(i,this.pos.y))return false;
						}
					}		
				}
				else if (x == this.pos.x && y != this.pos.y){
					if(this.pos.y < y){
						for(let i = this.pos.y + 1;i < y;i++){
							if(findF(this.pos.x,i))return false;
						}
					}
					else if(this.pos.y > y){
						for(let i = this.pos.y - 1;i > y;i--){
							if(findF(this.pos.x,i))return false;
						}
					}	
				}
				else return false;

				return true;
	},
	"knight" : function (x,y) {
				if((Math.abs(this.pos.x - x) == 1 && Math.abs(this.pos.y - y) == 2) || (Math.abs(this.pos.x - x) == 2 && Math.abs(this.pos.y - y) == 1))return true;
				else return false;
	},
	"bishop" : function (x,y){
				if(Math.abs(this.pos.x - x) == Math.abs(this.pos.y - y)){
					let x1 = this.pos.x;
					let y1 = this.pos.y;
					if(x > x1 && y > y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1++;
							y1++;
							if(findF(x1,y1))return false;
						}
					}
					else if(x < x1 && y > y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1--;
							y1++;
							if(findF(x1,y1))return false;
						}
					}
					else if(x > x1 && y < y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1++;
							y1--;
							if(findF(x1,y1))return false;
						}
					}
					else if(x < x1 && y < y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1--;
							y1--;
							if(findF(x1,y1))return false;
						}
					}
					return true;
				}
				else return false;
	},
	"king" : function(x,y,bool){				
				if ((Math.abs(x - this.pos.x) == 1 || Math.abs(x - this.pos.x) == 0) && (Math.abs(y - this.pos.y) == 1 || Math.abs(y - this.pos.y) == 0)) {
					return true;
				}
				else if (this.steps == 0 && bool == false){
					if (this.team == "black") {
						if(x == this.pos.x - 2 && findF(1,this.pos.y).figure.name == "rook" && !findF(3,this.pos.y)){
							findF(1,this.pos.y).figure.pos.x = 3;
							return true;
						}
						else if (x == this.pos.x + 2 && findF(8,this.pos.y).figure.name == "rook" && !findF(7,this.pos.y) && !findF(5,this.pos.y)){
							state[findF(8,this.pos.y).index].pos.x = 5;
							return true;
						}
					}
					else {
						if(x == this.pos.x + 2 && findF(8,this.pos.y).figure.name == "rook" && !findF(6,this.pos.y)){
							findF(8,this.pos.y).figure.pos.x = 6;
							return true;
						}
						else if (x == this.pos.x - 2 && findF(1,this.pos.y).figure.name == "rook" && !findF(4,this.pos.y) && !findF(2,this.pos.y)){
							state[findF(1,this.pos.y).index].pos.x = 4;
							return true;
						}
					}
					return false;
				} 
				return false;
	},
	"queen" : function (x,y) {
				if(x != this.pos.x && y == this.pos.y){
					if(this.pos.x < x){
						for(let i = this.pos.x + 1;i < x;i++){
							if(findF(i,this.pos.y))return false;
						}
					}
					else if(this.pos.x > x){
						for(let i = this.pos.x - 1;i > x;i--){
							if(findF(i,this.pos.y))return false;
						}
					}
					return true;		
				}
				else if (x == this.pos.x && y != this.pos.y){
					if(this.pos.y < y){
						for(let i = this.pos.y + 1;i < y;i++){
							if(findF(this.pos.x,i))return false;
						}
					}
					else if(this.pos.y > y){
						for(let i = this.pos.y - 1;i > y;i--){
							if(findF(this.pos.x,i))return false;
						}
					}
					return true;	
				}
				else if(Math.abs(this.pos.x - x) == Math.abs(this.pos.y - y)){
					let x1 = this.pos.x;
					let y1 = this.pos.y;
					if(x > x1 && y > y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1++;
							y1++;
							if(findF(x1,y1))return false;
						}
					}
					else if(x < x1 && y > y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1--;
							y1++;
							if(findF(x1,y1))return false;
						}
					}
					else if(x > x1 && y < y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1++;
							y1--;
							if(findF(x1,y1))return false;
						}
					}
					else if(x < x1 && y < y1){
						while (true){
							if(Math.abs(x1 - x) == 1 && Math.abs(y1 - y) == 1)break;
							x1--;
							y1--;
							if(findF(x1,y1))return false;
						}
					}
					return true;
				} 
				return false;
	}

}
var state = [];

function load(){
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/black.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/white.jpg');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/wR.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/wQ.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/wK.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/wN.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/wP.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/wB.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/bR.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/bQ.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/bK.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/bN.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/bP.png');
	document.body.appendChild(img);
	var img = document.createElement('img');
	img.setAttribute('src', 'public/images/bB.png');
	document.body.appendChild(img);
	let images = document.getElementsByTagName('img');
	for(let i = 0;i<images.length;i++){
		images[i].style.display = 'none';
		images[i].onload = function(){
			draw();
		}
	}
}

document.getElementById('send').onclick = function() {
	let msg = document.getElementById('msg').value
	if (msg.length > 20 || msg.length <= 0) return 0
	socket.emit('sendMsg', msg, `player ${team}`, window.location.href.split("=")[1])
}
document.onkeydown = function(e) {
	if (e.key == 'Enter') {
		document.getElementById('send').onclick()
		document.getElementById('msg').value = ""
	}
}

function posToCords(pos){
	pos++;
	let y = Math.floor(pos / 8 - 0.01) + 1;
	let x = pos - ((y-1)*8);
	return {
		x : x,
		y : y
	}
}
function draw(){
	for(let i = 0;i < 64;i++){
		let x = posToCords(i).x;
		let y = posToCords(i).y;
		if((y % 2 == 0 && x % 2 == 0) || (y % 2 != 0 && x % 2 != 0))ctx.drawImage(findImg("white.jpg"), (x-1)*size, (y-1)*size, size, size);
		else ctx.drawImage(findImg("black.png"), (x-1)*size, (y-1)*size, size, size);
	}
	for(let i = 0;i < state.length;i++){
		let images = document.getElementsByTagName('img');
		for(let k = 0;k<images.length;k++){
			if(images[k].src.substr(images[k].src.length - 6,6) == state[i].img){
				ctx.drawImage(images[k],(state[i].pos.x-1)*size + state[i].visPos.x,(state[i].pos.y-1)*size + state[i].visPos.y,size,size);
				break;
			}
		}
	}
	if (current != -1) ctx.drawImage(findImg(current.img),(current.pos.x-1)*size + current.visPos.x,(current.pos.y-1)*size + current.visPos.y,size,size);
}
function stepK(x1,y1){
	change(current,{x : x1, y : y1},{x : x1, y : y1});
	if(checkShah(current.team)){
		state = add(state,buffer[1].index,buffer[1].figure)
		change(current,buffer[0]);
		buffer = [];
		current = -1;
	}
	else {
		if(current.name == "pawn" && (y1 == 8 || y1 == 1)){
			choose(current, buffer[1].figure);
			return 0
		}
		socket.emit('sendDead', buffer[1].figure.team, buffer[1].figure.img, window.location.href.split("=")[1])
		buffer = [];
		if(current.name == "pawn" || current.name == "king")current.steps++;
		current.pos.x = x1;
		current.pos.y = y1;	
		if(current.team == "black")checkMat("white");
		else checkMat("black");
		current = -1;
		sendState();
		socket.emit("setTurn" , window.location.href.split("=")[1])
		draw();
	}		
}
function step(x1,y1){
	change(current,{x : x1, y : y1});
	if(checkShah(current.team)){
		change(current,buffer.pop());
		current = -1;
	}
	else {
		change(current,buffer.pop());
		if(current.name == "pawn" && (y1 == 8 || y1 == 1)){
			choose(current);
			return 0
		}
		if(current.name == "pawn" || current.name == "king")current.steps++;
		current.pos.x = x1;
		current.pos.y = y1;
		if(current.team == "black")checkMat("white");
		else checkMat("black");
		current = -1;
		sendState();
		socket.emit("setTurn" , window.location.href.split("=")[1])
		draw();
	}
}
function findF(x,y){
	if(x < 1 || x > 8 || y > 8 || y < 1)return false;
	for(let i = 0;i < state.length;i++){
		if(state[i].pos.x == x && state[i].pos.y == y)return {figure:state[i],index:i};
	}
	return false;
}
function findFName(name){
	let arr = [];
	for(let i = 0;i < state.length;i++){
		if(state[i].name == name)arr.push(state[i]);
	}
	return arr;
}
function add(state,ind,fig){
	let arr = [];
	let c = 0;
	for(let i = 0;i <= state.length;i++){
		if(i == ind){
			arr.push(fig)
			c--;
		}
		else arr.push(state[c])
		c++;
	}
	return arr;
}
function choose(obj, dead){
	let modal = document.createElement('div');
	let style = `
		position: fixed;
	    top: 0;
	    left : 0;
	    width: `+ window.innerWidth +`px;
	    height : 100vh;
	    display : flex;
	    flex-direction : row;
	    align-items : center;
	    justify-content : center;
	    background-color : rgba(0,0,0,0.9);
    `;
    modal.style.cssText = style;
    if(obj.team == 'black'){
    	let queenImg = findImg("bQ.png");
    	queenImg.style.display = "block";
    	let knightImg = findImg("bN.png");
    	knightImg.style.display = "block";
    	let queen = document.createElement('div');
    	let knight = document.createElement('div');
    	
    	queen.onclick = function () {
	    		obj.name = 'queen';
	    		obj.img = "bQ.png";
	    		obj.func = rules.queen;
				modal.remove();
				load();
				sendState();
				socket.emit("setTurn" , window.location.href.split("=")[1])
				socket.emit('sendDead', dead.team, dead.img, window.location.href.split("=")[1])
				draw();
    		}
    		knight.onclick = function (){
    			obj.name = 'knight';
	    		obj.img = "bN.png";
	    		obj.func = rules.knight;
				modal.remove();
				load();
				sendState();
				socket.emit("setTurn" , window.location.href.split("=")[1])
				socket.emit('sendDead', dead.team, dead.img, window.location.href.split("=")[1])
				draw();
    		}
    	queen.append(queenImg);
    	knight.append(knightImg);
    	modal.append(queen);
    	modal.append(knight);
    	document.body.append(modal);
    }
    else if (obj.team == "white"){
		let queenImg = findImg("wQ.png");
    	let knightImg = findImg("wN.png");
    	queenImg.style.display = "block";
    	knightImg.style.display = "block";
    	let queen = document.createElement('div');
    	let knight = document.createElement('div');
    	queen.onclick = function () {
	    		obj.name = 'queen';
	    		obj.img = "wQ.png";
	    		obj.func = rules.queen;
				modal.remove();
				sendState();
				socket.emit("setTurn" , window.location.href.split("=")[1])
				socket.emit('sendDead', dead.team, dead.img, window.location.href.split("=")[1])
				load();
				draw();
				
    		}
    		knight.onclick = function (){
    			obj.name = 'knight';
	    		obj.img = "wN.png";
	    		obj.func = rules.knight;
				modal.remove();
				sendState();
				socket.emit("setTurn" , window.location.href.split("=")[1])
				socket.emit('sendDead', dead.team, dead.img, window.location.href.split("=")[1])
				load();
				draw();
				
    		}
    	
    	queen.append(queenImg);
    	knight.append(knightImg);
    	modal.append(queen);
    	modal.append(knight);
    	document.body.append(modal);
    }   
}
function findImg(src){
	let images = document.getElementsByTagName('img');
	for(let i = 0;i < images.length;i++){
		if(images[i].src.split('/')[5] ==  src)return images[i];
	}
	return false;
}
function change(fig,pos,kill){
	buffer = [];
	if(kill){
		buffer.push({x : fig.pos.x,y:fig.pos.y})
		buffer.push(findF(kill.x,kill.y));
		state.splice(findF(kill.x,kill.y).index,1);
		fig.pos.x = pos.x;
		fig.pos.y = pos.y;
	}
	else{
		buffer.push({x : fig.pos.x,y:fig.pos.y})
		fig.pos.x = pos.x;
		fig.pos.y = pos.y;
	}
}
function mirroring (state,bull){
	for(let i = 0;i < state.length;i++){
		if(state[i].name == "pawn" && state[i].team == "white" && bull)state[i].func = rules.bP
		else if(state[i].name == "pawn" && state[i].team == "black" && bull)state[i].func = rules.wP
		state[i].pos.x = 9 - state[i].pos.x;
		state[i].pos.y = 9 - state[i].pos.y;
	}
	draw();
}
document.getElementById("abadon").onclick = function(){
	if(team == "spectator")return 0;
	socket.emit("disconnectFromGame" , window.location.href.split("=")[1], team)
	fetch("/clearCookie").then((res) => window.location.href = "/")
}
//socket
socket.on("clearCookie" , () => {
	fetch("/clearCookie")
})
let c = 0;
socket.on("sendState" , (newState, mirror) => {
	c++;
	current = -1
	for(let i = 0;i < newState.length;i++){
		if(newState[i].name == "pawn" && newState[i].team == "black")newState[i].func = rules.bP;
		else if(newState[i].name == "pawn" && newState[i].team == "white")newState[i].func = rules.wP;
		else if(newState[i].name == "rook" )newState[i].func = rules.rook;
		else if(newState[i].name == "knight" )newState[i].func = rules.knight;
		else if(newState[i].name == "bishop" )newState[i].func = rules.bishop;
		else if(newState[i].name == "king" )newState[i].func = rules.king;
		else if(newState[i].name == "queen" )newState[i].func = rules.queen;
	}
	state = newState;
	if(team == "white" && mirror == "black"){
		mirroring(state , true)
	}
	else if(team == "black" && mirror == "white"){
		mirroring(state , false)
	}
	else if (team === "spectator" && mirror == "black") {
		mirroring(state , true)
	}
	if(c > 1)document.getElementById("sound").play()
	draw();
})
socket.on('addDeads', (deads) => {
	for (let i = 0; i < (deads.white.length > deads.black.length ? deads.white.length : deads.black.length); i++) {
		let img = document.createElement('img')
		img.src = 'public/images/' + deads.white[i] 
		if (deads.white[i] !== undefined && team == "white") document.getElementById('db').append(img)
		if (deads.white[i] !== undefined && team == "black") document.getElementById('dw').append(img)

		img = document.createElement('img')
		img.src = 'public/images/' + deads.black[i] 
		if (deads.black[i] !== undefined && team == "white") document.getElementById('dw').append(img)
		if (deads.black[i] !== undefined && team == "black") document.getElementById('db').append(img)
	}
	document.getElementById('dw').style.marginRight = window.innerWidth * 0.2 + canvas.getBoundingClientRect().width - document.getElementById('dw').getBoundingClientRect().width + "px"
	document.getElementById('db').style.marginRight = window.innerWidth * 0.2 + canvas.getBoundingClientRect().width - document.getElementById('db').getBoundingClientRect().width + "px"
})
socket.on("setTeam" , (t) => {
	team = t;
	if (team == 'white') {
		document.getElementById('dw').style.backgroundColor = team
		document.getElementById('db').style.backgroundColor = team
	}
	else {
		document.getElementById('dw').style.backgroundColor = 'black'
		document.getElementById('db').style.backgroundColor = 'white'
	}
	let span = document.createElement('span');
	span.innerText = "you connected like player " + t;
	document.getElementById("log").append(span);
})
socket.on("startGame" , () => {
	startGame = true;
	let span = document.createElement('span');
	span.innerText = "game started!";
	document.getElementById("log").append(span);
	document.getElementById('state').innerText = "TURN " + turn.toUpperCase() 
})
socket.on("win" , (team) => {
	win(team)
})
socket.on('addDead', (t, src) => {
	let img = document.createElement('img')
	img.src = 'public/images/' + src
	if (team == 'black') document.getElementById(t == 'black' ? 'db' : 'dw').append(img)
	else if (team == 'white') document.getElementById(t == 'white' ? 'db' : 'dw').append(img)
	document.getElementById('dw').style.marginRight = window.innerWidth * 0.2 + canvas.getBoundingClientRect().width - document.getElementById('dw').getBoundingClientRect().width + "px"
	document.getElementById('db').style.marginRight = window.innerWidth * 0.2 + canvas.getBoundingClientRect().width - document.getElementById('db').getBoundingClientRect().width + "px"
})
socket.on("changeTurn" , () => {
	turn == "white" ? turn = "black" : turn = "white";
	document.getElementById('state').innerText = "TURN " + turn.toUpperCase()  
})
socket.on("sendToLog" , (msg) => {
	let span = document.createElement('span');
	span.innerText = msg;
	document.getElementById("log").append(span);
})
function sendState(){
	document.getElementById("sound").play()
	socket.emit("sendState" , state , window.location.href.split("=")[1], team)
}
function checkShah(team){
	let kings = findFName("king");
	let knightSteps = [[1,2],[2,1],[-1,2],[2,-1],[1,-2],[-2,1],[-1,-2],[-2,-1]];
	console.log(1);
	for(let h = 0;h < kings.length;h++){
		let king = kings[h];
		if(king.team != team)continue;
		for(let i = king.pos.y - 1;i >= 1;i--){
			if(findF(king.pos.x,i)){
				if(findF(king.pos.x,i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x,i).figure.team != king.team)return true
				else break;
			}
		}
		for(let i = king.pos.y + 1;i <= 8;i++){
			if(findF(king.pos.x,i)){
				if(findF(king.pos.x,i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x,i).figure.team != king.team)return true
				else break;
			}
		}
		for(let i = king.pos.x - 1;i >= 1;i--){
			if(findF(i,king.pos.y)){
				if(findF(i,king.pos.y).figure.func(king.pos.x,king.pos.y) && findF(i,king.pos.y).figure.team != king.team)return true
				else break;
			}
		}
		for(let i = king.pos.x + 1;i <= 8;i++){
			if(findF(i,king.pos.y)){
				if(findF(i,king.pos.y).figure.func(king.pos.x,king.pos.y) && findF(i,king.pos.y).figure.team != king.team)return true
				else break;
			}
		}
		let check = [0,0,0,0];
		for(let i = 1;i <= 8;i++){ 
			if(findF(king.pos.x + i,king.pos.y + i) && check[0] == 0){
				if(findF(king.pos.x + i,king.pos.y + i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x + i,king.pos.y + i).figure.team != king.team)return true
				else check[0] == 1;
			}
			if(findF(king.pos.x - i,king.pos.y + i) && check[1] == 0){
				if(findF(king.pos.x - i,king.pos.y + i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x - i,king.pos.y + i).figure.team != king.team)return true
				else check[1] == 1;
			}
			if(findF(king.pos.x + i,king.pos.y - i) && check[2] == 0){
				if(findF(king.pos.x + i,king.pos.y - i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x + i,king.pos.y - i).figure.team != king.team)return true
				else check[2] == 1;
			}
			if(findF(king.pos.x - i,king.pos.y - i) && check[3] == 0){
				if(findF(king.pos.x - i,king.pos.y - i).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x - i,king.pos.y - i).figure.team != king.team)return true
				else check[3] == 1;
			}
		}
		for(let i = 0;i < knightSteps.length;i++){
			if(findF(king.pos.x + knightSteps[i][0],king.pos.y + knightSteps[i][1])){
				if(findF(king.pos.x + knightSteps[i][0],king.pos.y + knightSteps[i][1]).figure.func(king.pos.x,king.pos.y) && findF(king.pos.x + knightSteps[i][0],king.pos.y + knightSteps[i][1]).figure.team != king.team)return true;
			}
		}
	}
	return false;
}
function checkMat(team){
	let num = state.length;
	for(let i = 0;i < num;i++){
		if(state[i].team != team)continue;
		let fig = state[i];
		let arr = [];
		for(let y = 1;y <= 8;y++){
			for(let x = 1;x <= 8;x++){
				if(!state[i].func(x,y))continue;
				else {
					if(findF(x,y)){
						if(findF(x,y).figure.team != fig.team)arr.push({x : x,y : y})
					}
					else arr.push({x : x,y : y});
				}
			}
		}
		for(let k = 0;k < arr.length;k++){
			if(findF(arr[k].x,arr[k].y)){
				change(fig,{x : arr[k].x, y : arr[k].y},{x : arr[k].x, y : arr[k].y});
				if(checkShah(fig.team)){
					state = add(state,buffer[1].index,buffer[1].figure)
					change(fig,buffer[0]);
					buffer = [];					
				}
				else {
					state = add(state,buffer[1].index,buffer[1].figure)
					change(fig,buffer[0]);
					buffer = [];
					current = -1;
					return false;
				}		
			}
			else{
				change(fig,{x : arr[k].x, y : arr[k].y});
				if(checkShah(fig.team)){
					change(fig,buffer.pop());	
				}				
				else {
					change(fig,buffer.pop());
					current = -1;
					return false;
				}
			}
		}
	}
	win(team);
	socket.emit("victory" , team , window.location.href.split("=")[1] )
	socket.emit("disconnectFromGame" , window.location.href.split("=")[1])
}
function win(team){
	let text = ""
	if(team == "black")text = "white" + " WINS";
	else text = "black" + " WINS";
	
	let modal = document.createElement("div");
	let cross = document.createElement("div");
	cross.innerHTML = '<i class="fas fa-times"></i>';
	cross.style.cssText = 'position : absolute;top : 15px; right : 15px;cursor:pointer';
	cross.onclick = function(){
		modal.style.display = "none";
	}
	let css = `
		width : ` + String(0.2 * window.innerWidth) + `px;
		height : ` + String(0.2 * window.innerWidth) + `px;
		position:fixed;
		top: ` + String(window.innerHeight / 2 - 0.1 * window.innerWidth) + `px;
		left : ` + String(window.innerWidth / 2 - 0.1 * window.innerWidth) + `px;
		color:green;
		background-color:#fbf6f6;
		box-shadow : 0 0 10px 0 rgba(0,0,0,0.7);
		font-size:22px;
		text-align:center;
		padding : 15px;
	`
	modal.style.cssText =  css;

	modal.innerText = text;
	modal.append(cross);
	document.body.append(modal);
}



 
