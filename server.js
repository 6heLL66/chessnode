const express 	= require('express')
const app 		  = express()
const port 		  = 8000
var server  	  = require('http').createServer(app)
var io			    = require('socket.io').listen(server)
var state       = require('./module.js')
console.log(state.getNum(2))


app.get('/', (request, response) => {
    response.sendFile('index.html',{root : __dirname})
})

app.get('/game', (request, response) => {
    response.sendFile('game.html',{root : __dirname})
})

app.use('/public',express.static('public'))



server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})


io.on('connection',(socket) => {
		console.log("connected")
		socket.on('disconnect', function(){
      		console.log('disconnected')
  	})
    socket.on('message' , function(msg){
      socket.broadcast.json.send(JSON.stringify(msg))
    })
})