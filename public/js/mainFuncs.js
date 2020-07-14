function fillState(state){
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
					if(x == this.pos.x - 2 && findF(1,this.pos.y).figure.name == "rook" && !findF(3,this.pos.y)){
						findF(1,this.pos.y).figure.pos.x = 3;
						return true;
					}
					else if (x == this.pos.x + 2 && findF(8,this.pos.y).figure.name == "rook" && !findF(7,this.pos.y) && !findF(5,this.pos.y)){
						state[findF(8,this.pos.y).index].pos.x = 5;
						return true;
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
	for(let i = 0;i < 32;i++){
		if(i < 16){
			if(i < 8){
				let obj = {
					name : "pawn",
					pos : {x : i + 1, y : 2},
					team : "white",
					img : "wP.png",
					steps : 0,
					func : rules.wP
				}
				state.push(obj);
			}
			if(i == 8 || i == 9){
				let obj = {
					name : "rook",
					pos : {x : i == 8 ? 1 : 8, y : 1},
					team : "white",
					img : "wR.png",
					func : rules.rook
				}
				state.push(obj);
			}
			if(i == 10 || i == 11){
				let obj = {
					name : "knight",
					pos : {x : i == 10 ? 2 : 7, y : 1},
					team : "white",
					img : "wN.png",
					func : rules.knight
				}
				state.push(obj);
			}
			if(i == 12 || i == 13){
				let obj = {
					name : "bishop",
					pos : {x : i == 12 ? 3 : 6, y : 1},
					team : "white",
					img : "wB.png",
					func : rules.bishop
				}
				state.push(obj);
			}
			if(i == 14){
				let obj = {
					name : "king",
					pos : {x : 4, y : 1},
					team : "white",
					steps : 0,
					img : "wK.png",
					func : rules.king
				}
				state.push(obj);
			}
			if(i == 15){
				let obj = {
					name : "queen",
					pos : {x : 5, y : 1},
					team : "white",
					img : "wQ.png",
					func : rules.queen
				}
				state.push(obj);
			}
		}
		else {
			if(i < 24){
				let obj = {
					name : "pawn",
					pos : {x : i - 15, y : 7},
					team : "black",
					img : "bP.png",
					steps : 0,
					func : rules.bP
				}
				state.push(obj);
			}
			if(i == 24 || i == 25){
				let obj = {
					name : "rook",
					pos : {x : i == 24 ? 1 : 8, y : 8},
					team : "black",
					img : "bR.png",
					func : rules.rook
				}
				state.push(obj);
			}
			if(i == 26 || i == 27){
				let obj = {
					name : "knight",
					pos : {x : i == 26 ? 2 : 7, y : 8},
					team : "black",
					img : "bN.png",
					func : rules.knight
				}
				state.push(obj);
			}
			if(i == 27 || i == 28){
				let obj = {
					name : "bishop",
					pos : {x : i == 27 ? 3 : 6, y : 8},
					team : "black",
					img : "bB.png",
					func : rules.bishop
				}
				state.push(obj);
			}
			if(i == 29){
				let obj = {
					name : "king",
					pos : {x : 4, y : 8},
					team : "black",
					steps : 0,
					img : "bK.png",
					func : rules.king
				}
				state.push(obj);
			}
			if(i == 30){
				let obj = {
					name : "queen",
					pos : {x : 5, y : 8},
					team : "black",
					img : "bQ.png",
					func : rules.queen
				}
				state.push(obj);
			}
		}
	}
	return state;
}
function findGame(key,games){
  for(let i = 0;i < games.length;i++){
    if(games[i].key == key)return {game : games[i] , i : i};
  }
  return false;
}
function findGameId(id,games){
  for(let i = 0;i < games.length;i++){
    if(games[i].players.white == id || games[i].players.black == id)return games[i];
  }
  return false;
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
module.exports = {
	fillState : fillState,
	findGame : findGame,
	findGameId : findGameId
}