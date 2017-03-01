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
		// �ڑ��J�n�J�X�^���C�x���g(�ڑ������[�U��ۑ����A�����[�U�֒ʒm)
  		socket.on("connected", function (name) {
    	var msg = name + "が入室しました";
    	userHash[socket.id] = name;
    	io.sockets.emit("publish", {value: msg});
  	});

  	// ���b�Z�[�W���M�J�X�^���C�x���g
  	socket.on("publish", function (data) {
    	io.sockets.emit("publish", {value:data.value});
  	});

  	// �ڑ��I���g�ݍ��݃C�x���g(�ڑ������[�U���폜���A�����[�U�֒ʒm)
  	socket.on("disconnect", function () {
    if (userHash[socket.id]) {
      var msg = userHash[socket.id] + "が退出しました";
      delete userHash[socket.id];
      io.sockets.emit("publish", {value: msg});
    		}
		 });
	});