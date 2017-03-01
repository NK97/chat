	const http = require('http');
	const fs = require('fs');
	const socketio = require('socket.io');
	
	const port = 3000;
	
	const server = http.createServer(function(req,res){
		res.writeHead(200,{'Content-Type' : 'text/html'});
		res.end(fs.readFileSync(__dirname + '/client/index.html'),'utf8');
		}).listen(port);
	
	const io = socketio.listen(server);
	var userHash = {};
	io.sockets.on('connection',function(socket){
		// 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
  		socket.on("connected", function (name) {
    	var msg = name + "縺悟�･螳､縺励∪縺励◆";
    	userHash[socket.id] = name;
    	io.sockets.emit("publish", {value: msg});
  	});

  	// メッセージ送信カスタムイベント
  	socket.on("publish", function (data) {
    	io.sockets.emit("publish", {value:data.value});
  	});

  	// 接続終了組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
  	socket.on("disconnect", function () {
    if (userHash[socket.id]) {
      var msg = userHash[socket.id] + "縺碁蜃ｺ縺励∪縺励◆";
      delete userHash[socket.id];
      io.sockets.emit("publish", {value: msg});
    		}
		 });
	});