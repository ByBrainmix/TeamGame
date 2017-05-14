var csfr        = require('csurf');
var bodyParser  = require('body-parser');
var logger      = require('morgan');
var models      = require('./models');
var path        = require('path');
var sessions    = require('client-sessions');


module.exports.setup = function(app, express) {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(sessions({
        cookieName: 'session',
        secret: '3E41DC66DF5633C3F6FE9C4',
        duration: 30*60*1000,
        activeDuration: 5*60*1000,
        httpOnly: true,
        secure: true,
        ephemeral: true
    }));
    app.use(sessionUser);
    app.use(csfr());
}

module.exports.setupAfterRouting = function(app) {
    app.use(catch404);
    if (app.get('env') === 'development') app.use(developmentErrorHandler);
    app.use(productionErrorHandler);
}

function sessionUser(req, res, next) {
    if (req.session && req.session.user) {
        models.User.findOne({
            email: req.session.user.email
        }, 'username email rang date data', function (err, user) {
            if(user) {

                var cleanUser = {
                    username: user.username,
                    email: user.email,
                    rang: user.rang,
                    date: user.date,
                    data: user.data || {}
                }

                req.user = cleanUser;
                req.session.user = cleanUser;
                res.locals.user = cleanUser;
            }
            next();
        });
    } else {
        next();
    }

};

//--- set befor route and the page is only accessable while logged in ---//
module.exports.requireLogin = function (req, res, next) {
    if(!req.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

//--- catch 404 and forward to error handler ---//
function catch404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

//--- production error handler ---//
function productionErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
}

//--- development error handler ---//
function developmentErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
}