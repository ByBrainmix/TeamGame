var channels = require('../channels');

module.exports = function(app) {
    app.get('/channel/:id', get);
}

function get(req, res) {
    
    // get id
    var id = req.params.id;

    // check, if channel exists
    if (!channels[id]) {
        // render an error
        res.render('error', {
            message:    'This channel doesn\'t exists',
            error:      {status: ''}
        });
        return;
    }

    // render page
    res.render('channel', {
        id:         id,
        players:    channels[id].maxPlayers,
        game:       channels[id].game,

    });
    
}