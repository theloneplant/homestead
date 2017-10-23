#!/usr/bin/env node
var debug = require('debug')('first-iteration:server');
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = 3000;

var app = express();
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.set('port', port);

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/fonts',express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));
app.use('/fonts',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/fonts')));

app.use('/api/v1', require(path.join(__dirname, 'routes/api/v1')));

app.use('*', express.static(path.join(__dirname, 'dist', 'index.html')));

app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

function onError(error) {
	if (error.syscall !== 'listen') throw error;
	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
		case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
		default:
		throw error;
	}
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}

module.exports = app;
