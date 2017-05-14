$(document).ready(function() {
   
    $('#connectToChannel').click(function() {
        
        console.log('test');
        
        var channelID = $('#channelID').val();
        if(!channelID) return;
        
        var host = "http://"+window.location.host;
        window.location = (host + '/channel/' + channelID);
        
    });
    
});