
	(function(){
		socket = io.connect();
		socket.on("connect" , function(){
			console.log("Подключение установлено");
		})
	})();
