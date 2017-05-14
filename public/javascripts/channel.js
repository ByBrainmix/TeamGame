$(document).ready(function() {
    
    //SOCKET.IO
    var socket = io('/channel');
    socket.emit('connectClient', {id: window.location.pathname.substring(9), username: $('#username').html()});
    socket.on('connectClient', function(data) {
        $('#connectedAs').html(' | connected as ' + data.username); 
    });
    
    // send chat message to server
    $('#btnSend').click(function() {
        
        var msg = $('#textInput').val();
        if(!msg) return;
        
        socket.emit('sendMsg', {msg: msg});
        
    }); 
    
    // retrive chat messages
    socket.on('sendMsg', function(data) {
        $('#chatOutput').append('<strong>' + data.username + '</strong>: ' + data.msg + '<br>');
    });
    
    // broadcast message
    socket.on('br', function(data) {
        $('#chatOutput').append(data + '<br>');
    })
    
});