var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

/* GET scrape thechive and get galleries and images */
/* TODO: Correctly include video galleries */
/*
    [
        {
            id: "",
            title: "",
            uri: "",
            images: [
                {
                    uri: "",
                    caption: ""
                }
            ]
        }
    ]
*/
router.get('/thechive/:page?', function(req, res) {
    // decide which page to scrape for galleries
    var pageUri = 'http://thechive.com/page/1';
    if(req.params.page) {
        pageUri = 'http://thechive.com/page/' + req.params.page;
    }
    // load the page
    request(pageUri, function(error, response, html) {
        // if error, return the error
        if(error) res.send(error);
        // scrape the page for galleries
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
                    image.uri = $(e).find('img').attr('src').split('?')[0];
                    image.caption = $(e).find('dd').text();
                    galleries[i].images.push(image);
                });
            }
            res.send(galleries);
        });
    });
});


module.exports = router;
