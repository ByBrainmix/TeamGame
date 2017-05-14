module.exports = function(app) {
    
    require('./admin')(app);
    require('./channel')(app);
    require('./create')(app);
    require('./dashboard')(app);
    require('./index')(app);
    require('./login')(app);
    require('./logout')(app);
    require('./register')(app);
    
}