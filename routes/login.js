var models = require('../models');
var bcrypt = require('bcryptjs');

module.exports = function(app) {
    app.get('/login', get);
    app.post('/login', post);
}

function get(req, res) {

    //render page
    res.render('login', {
        csrfToken: req.csrfToken()
    });
}

function post(req, res) {
    
    // test if input matches an email
    if(req.body.username.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
        //entered an e.mail
        models.User.findOne({email: req.body.username}, callback);
    } else  {
        //entered an username
        models.User.findOne({username: req.body.username}, callback);
    }
    function callback(err, user) {
        if(!user) {
            //user doesn't exists
            res.render('login', {error: 'Invalid username/email'});
        } else {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                //successful loged in
                req.session.user = user; 
                res.redirect('/');
            } else {
                //wrong password
                res.render('login', {error: 'Invalid password'});
            }
        }
    }
}