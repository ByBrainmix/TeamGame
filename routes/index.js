module.exports = function(app) {
    app.get('/', get);
}

function get(req, res) {
    
    //render page
    res.render('index');
}