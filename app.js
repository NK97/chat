	const http = require('http');
	const fs = require('fs');
	const socketio = require('socket.io');
	
	const port = 3000;
	
	const server = http.createServer(function(req,res){
		res.writeHead(200,{'Content-Type' : 'text'});
		res.end(fs.readFileSync(__dirname + '/client/index.html'),'utf8');
		}).listen(port);
	
	const io = socketio.listen(server);
	io.sockets.on('connection',function(socket){
		socket.on('message',function(data){
		console.log(data.value);
			io.sockets.emit('from_server',{value:data.value});
		 	});
		});
	