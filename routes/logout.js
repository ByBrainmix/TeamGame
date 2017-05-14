module.exports = function(app) {
    app.get('/logout', get);
}

function get(req, res) {

    // delete session
    req.session.user = null;
    // redirect to main page
    res.redirect('/');
    
}