var models = require('../models');
var rang = require('../server').rang;
var channels = require('../channels');

module.exports = function(app) {
    app.get('/admin', get);
}

function get(req, res) {

    // if there are no session of an user redirect
    if(!(req.session && req.session.user)) {
        res.redirect('/');
        return;
    }
    // if the user isn't a administrator redirect
    if(!(req.session.user.rang === "Administrator")) { 
        res.redirect('/');
        return ;
    }
    
    // get all accounts from the database
    models.User.find({}, function(err, users) {
        
        // if there is a error, render it
        if(err) res.render('error', {error: err});

        // save the data in a map
        var userMap = {};
        users.forEach(function(user) {
            userMap[user._id] = user; 
        });

        // render the page
        res.render('admin', {
            isAdmin:    true,
            userMap:    userMap,
            channels:   channels
        });

    });
    
    
}