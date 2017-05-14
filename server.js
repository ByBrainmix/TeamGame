//--- Module dependencies ---//
var express     = require('express');
var http        = require('http');
var path        = require('path');
var socketio    = require('socket.io');
var middleware  = require('./middleware');

var app          = express();

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = true;

// setup middleware
middleware.setup(app, express);

// setup routes
require('./routes/routes')(app);

// setup middleware after routing
middleware.setupAfterRouting(app);

// get port and ip_address
var port       = process.env.OPENSHIFT_NODEJS_PORT || '8080';
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// create server
var server  = http.createServer(app);
var io      = socketio(server);
server.listen(port, ip_address, function() {
    console.log('Server is running on ' + ip_address + ':' + port); 
});

// handle sockets
require('./socket')(io);

// rang model
module.exports.rang = {
    USER: "User",
    ADMINISTRATOR: "Administrator"
}
