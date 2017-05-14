var middleware = require('../middleware');

module.exports = function(app) {
    app.get('/dashboard', middleware.requireLogin, get);
    
}

function get(req, res) {
    
    // render page
    res.render('dashboard', {
        isDashboard: true
    });
}