var models = require('./models');

var rooms = {};
var clients = {};

module.exports = function(io) {
    
    // Admin namespace
    var ncAdmin = io.of('/admin');
    ncAdmin.on('connection', function(socket) {
        
        // admin: delete account
        socket.on('deleteUser', function(data) {
            models.User.findByIdAndRemove(data.id, function() {});
        });

        // admin: change user rang
        socket.on('changeRang', function(data) {
            
            for(var r in rang) {
                if(data.rang === r) {
                    models.User.findByIdAndUpdate(data.id, {rang: data.rang}, function() {});
                    break;
                }
            }
        });
        
    });
    
    // Channel namespace
    var ncChannel = io.of('/channel');
    ncChannel.on('connection', function(socket) {
        
        socket.on('connectClient', function(data) {
            rooms[socket.id] = data.id;
            socket.join(rooms[socket.id]);
            var username = data.username || 'user' + (Object.keys(rooms).length + 1);
            clients[socket.id] = username;
            ncChannel.in(rooms[socket.id]).emit('br', '<span style="color: darkred;">'+username + ' has joined!</span>');
            socket.emit('connectClient', {username: clients[socket.id]});
        });
        
        
        // retrive chat message and send it to all clients
        socket.on('sendMsg', function(data) {
            ncChannel.in(rooms[socket.id]).emit('sendMsg', {msg: data.msg, username: clients[socket.id]});
        });
        
    });

}

