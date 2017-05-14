$(document).ready(function () {

    //SOCKET.IO
    var socket = io('/admin');

    // admin: collapse
    $('.collapse').collapse('hide');

    // admin: delete an account
    $('.deleteUser').click(function() {

        var id = this.id.substring(6)
        var $panel = $('#panel' + id);
        var $mainPanel = $('#mainPanel' + id);

        bootbox.confirm('Are you sure, to delete the user-account <strong>' + $panel.children()[1].innerHTML + '</strong>', function(result) {
            if (!result) return;
            socket.emit('deleteUser', {id: id });
            // render
            $($mainPanel).fadeOut(300, function () { 
                $(this).remove();
            });
        });

    });

    // admin: change account rang
    $('.changeRang').click(function() {

        var id = this.id.substring(2);
        var $panel = $('#panel' + id);

        bootbox.prompt('Type the new rang for the user <strong>' + $panel.children()[1].innerHTML + '</strong>', function(result) {
            changeRang(id, result);
        });
    });


    // changeRang()
    function changeRang(id, rang) {

        //logic
        if(!rang) return;
        rang = rang.toLowerCase();

        if(rang) {
            socket.emit('changeRang', {id: id, rang: rang});
            //render
            $('#panel' + id + ' .rang').html(rang);
            $('#cr' + id).parent().children()[0].innerHTML = rang;
        }

    }

});
