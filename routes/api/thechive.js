var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var synchronize = require('synchronize');
var async = require('async');
var mongoose = require('mongoose');
var Source = mongoose.model('Source');
var Gallery = mongoose.model('Gallery');


/* GET source metadata for thechive */
router.get('/', function(req, res) {
    Source.find({name: 'thechive'}, function(error, sources, count) {
        res.send(sources);
    });
});


/* GET initialize source metadata for thechive */
router.get('/init', function(req, res) { 
    new Source( {
        name: 'thechive',
        uri: 'http://thechive.com/page/1',
        last_update: new Date(),
        next_update: new Date(),
        update_interval: 900000
    }).save(function(error, source, count) {
        if(error) {
            res.send('thechive is already initialized');
        } else {
            res.send('thechive has been initialized');
        }
    });
});


/* GET galleries */
router.get('/galleries', function(req, res) {
    Gallery.find({}, function(error, galleries, count) {
        res.send(galleries);
    });
});


/* GET scrape the source uri, create new galleries, trigger new gallery scrapes */
router.get('/scrape', function(req, res) {
    //
    Source.findOne({name: 'thechive'}, function(error, source) {
        //
        if(error || !source) res.send('Error Finding TheChive Source.');
        //
        request(source.uri, function(error, response, html) {
            //
            if(error) res.send(error);
            //
            var $ = cheerio.load(html),
                galleries = [], gallery, 
                tasks = [], image,
                createTask = function(uri) {
                    return function(callback) { request(uri, callback); };
                };
            $('article').each(function(i, e) {
                gallery = {};
                gallery.id = $(e).attr('id');
                gallery.title = $(e).find('.post-title a').text();
                gallery.uri = $(e).find('.post-title a').attr('href');
                gallery.images = [];
                galleries.push(gallery);
                tasks.push(createTask(gallery.uri));
            });
            async.parallel(tasks, function(error, results) {
                for(var i=0; i<results.length; i++) {
                    $ = cheerio.load(results[i][1]);
                    $('dl').each(function(j, e) {
                        image = {};
                        image.uri = $(e).find('img').attr('src');
                        image.caption = $(e).find('dd').text();
                        galleries[i].images.push(image);
                    });
                }
                res.send(galleries);
            });
        });
    });
});


module.exports = router;
