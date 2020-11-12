
	(function(){
		socket = io.connect();
		socket.href ="/";
		socket.on("connect" , function(){
			console.log("Подключение установлено",socket);
		})
	})();
