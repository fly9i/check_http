
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/res',routes.res);
app.get('/md',routes.marked);
app.get('/editor',routes.editor)

var server=http.createServer(app);
server.listen(80, function(){
  console.log('Express server listening on port ' + 80);
});
var io = require('socket.io').listen(server);
io.set('log level', 2);
io.sockets.on('connection', function (socket) {
	socket.emit('connected',{res:true})
	require('./module/socketio').handle(socket,io);
});