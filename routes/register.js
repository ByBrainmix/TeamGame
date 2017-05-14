var bcrypt = require('bcryptjs');
var models = require('../models');

module.exports = function(app) {
    app.get('/register', get);
    app.post('/register', post);
}

function get(req, res) {

    //render page
    res.render('register', {
        csrfToken: req.csrfToken()
    });
    
}

function post(req, res) {

    // check if entered name matches the properties of an username
    if(!req.body.username.match(/^[A-Za-z]\w{2,}$/)) {
        var error = 'You\'ve entered a no acceptable name!';
        res.render('register', {error: error});
        return;
    }

    // hashing password
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    // new date
    var date = new Date

    // create new user model
    var user = new models.User({
        username:   req.body.username,
        email:      req.body.email,
        date:       date.now,
        password:   hash
    });

    // save user in database
    user.save(function(err) {
        if(err) {
            // an error occurred
            var error = 'Something bad happend! Try again!';
            if(err.code == 11000) {
                error = 'That email or username is already taken.';
            }
            res.render('register', {error: error});
        } else {
            // successful registerd
            req.session.user = user; 
            res.redirect('/dashboard');
        }

    });
}