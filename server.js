const express 	   = require('express')
const app 		     = express()
const PORT         = process.env.PORT || 3000;
var server  	     = require('http').createServer(app)
var io			       = require('socket.io').listen(server)
const bodyParser   = require('body-parser');
const axios        = require('axios');
const Parser       = bodyParser.urlencoded({extended: false})
var createState    = require('./public/js/createState.js')
var cookieParser   = require('cookie-parser')
var games          = []
var lastGame       = false;


app.use(cookieParser("key"))

app.get('/', (request, response) => {
    response.sendFile('index.html',{root : __dirname})
    if(request.cookies.gameId === undefined){
      response.cookie('gameId', "")
      response.cookie('clientId', String(Math.round(Math.random() * 10000000000)))
    }   
})

app.get('/game', (request, response) => {
    response.sendFile('game.html',{root : __dirname})
    lastGame = findGame(request.query.key).game;
    if(!lastGame)response.redirect("/")
    if(request.cookies.gameId == "" || request.cookies.gameId == request.query.key)response.cookie('gameId', String(request.query.key))
    else response.redirect("/")
})

app.use('/public',express.static('public'))
app.get("/getCookie" ,(req,res) => {
  console.log(req.cookies);
})

app.get("/clearCookie" , (req,res) =>{
  res.clearCookie('gameId')

  res.send("da")
})


server.listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${PORT}`)
})


io.on('connection',(socket) => {
  console.log("connected")
  socket.on("disconnect", function(){
    console.log("disconnect")
  })
  socket.on("disconnectFromGame" , (key, team) => {
    games.splice(findGame(key).i,1);
    socket.to(key).emit("sendToLog" , "player was disconnected ")
    socket.to(key).emit("clearCookie")
    socket.to(key).emit("win", team)
  })
  socket.on("connectToRoom", () => {
    socket.join(lastGame.key , () => {
      console.log("socket joined room " + lastGame.key + " with id " + socket.request.headers.cookie.split(';')[0].split("=")[1])
      socket.emit("sendState", lastGame.state, lastGame.mirror)
      socket.to(lastGame.key).emit("sendToLog" , "player joined room " + "with id " + socket.request.headers.cookie.split(';')[0].split("=")[1])
    })
    let clientId = socket.request.headers.cookie.split(';')[0].split("=")[1]
    if(lastGame.players.white == "first"){
      socket.emit("setTeam" , "white")
      lastGame.players.white = clientId
    }
    else if(lastGame.players.black == "first"){
      socket.emit("setTeam" , "black")
      lastGame.players.black = clientId
    }
    else if(clientId == lastGame.players.white){
        socket.emit("setTeam" , "white")
        if(lastGame.players.black != "")socket.emit("startGame")
        if(lastGame.turn == "black")socket.emit("changeTurn")
    }
    else if (clientId == lastGame.players.black){
        socket.emit("setTeam" , "black")
        if(lastGame.players.white != "")socket.emit("startGame")
        if(lastGame.turn == "black")socket.emit("changeTurn")
    }
    else if(lastGame.players.white != "" && lastGame.players.black != ""){
      socket.emit("setTeam" , "spectator")
    }       
    else if(lastGame.players.white != "" && lastGame.players.black != clientId){
      socket.emit("setTeam" , "black")
      lastGame.players.black = clientId
      socket.to(lastGame.key).emit("startGame")
      socket.emit("startGame")
    }
    else if(lastGame.players.white == "" && lastGame.players.white != clientId){
      socket.emit("setTeam" , "white")
      lastGame.players.white = clientId
      socket.to(lastGame.key).emit("startGame")
      socket.emit("startGame")
    }
  })
  socket.on("makeGame" , (game) => {
    let state = [];
    createState.fillState(state);
    game.state = state;
    games.push(game);
  })
  socket.on("getGames" , () => {
    socket.json.send(JSON.stringify({do : "sendGames" , data : games}))
  })
  socket.on("sendState" , (state, key, mirror) => {
    socket.to(key).emit("sendState" , state, mirror)
    findGame(key).game.state = state
    findGame(key).game.mirror = mirror
  })
  socket.on("victory" , (team , key) => {
    socket.to(key).emit("win" , team)
    socket.emit("clearCookie")
  })
  socket.on("setTurn" , (key) => {
    console.log("setTurn")
    let game = findGame(key).game
    if(game.turn == "white")game.turn = "black"
    else game.turn = "white"
    socket.to(key).emit("sendToLog" , "YOUR TURN!")
    socket.to(key).emit("changeTurn")
    socket.emit("changeTurn")
  })
})



function findGame(key){
  for(let i = 0;i < games.length;i++){
    if(games[i].key == key)return {game : games[i] , i : i};
  }
  return false;
}
function findGameId(id){
  for(let i = 0;i < games.length;i++){
    if(games[i].players.white == id || games[i].players.black == id)return games[i];
  }
  return false;
}