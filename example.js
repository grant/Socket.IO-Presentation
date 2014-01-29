var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.sockets.emit('time', {
		time: new Date().toJSON()
    });
}

// Send current time every 1000ms
setInterval(sendTime, 1000);

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    socket.emit('welcome', { message: 'Welcome! We are now connected!' });

    socket.on('i am client', console.log);
});

app.listen(3000);