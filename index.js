/* */

//
//
var config = {
        serverPort: process.env.PORT || 3000,
        stripeKey:  process.env.STRIPE_KEY || 'unknown' 
    },
    express = require('express'),
    jade = require('jade'),
    multer = require('multer'),
    stripe = require('stripe')(config.stripeKey),
    app = express(),
    server;

//
//
app.use(multer({dest:'./uploads'}));
app.set('views', './views');
app.set('view engine', 'jade');

//
//
app.use(express.static('./public'));

//
//
app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});

//
//
app.use(function(req, res) {
    res.redirect('/');
});
app.use(function(err, req, res, next) {
    console.log(err);
    res.redirect('/');
});

// 
//
server = app.listen(config.serverPort, function() {
    console.log('Listening at http://%s:%s', 
        server.address().address,
        server.address().port
    );
});
