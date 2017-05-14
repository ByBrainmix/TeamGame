var channels = require('../channels')
var randomString = require('randomstring');

module.exports = function(app) {
    app.get('/create', get);
    app.post('/create', post);
}

function get(req, res) {

    //render page
    res.render('create', {
        isCreate:   true,
        csrfToken:  req.csrfToken()
    });
    
}

function post(req, res) {

    // generate random string for the channel id
    var channelId = randomString.generate(20);
    while (channels[channelId]) {
        channelId = randomString.generate(20);
    }

    // create new channel
    var public = req.body.public === 'true' ? true : false;

    channels[channelId]             = {};
    channels[channelId].players     = {};
    channels[channelId].maxPlayers  = req.body.players;
    channels[channelId].game        = req.body.game;
    channels[channelId].public      = public;
    
    // redirect to the channel
    res.redirect('/channel/' + channelId);
    
}