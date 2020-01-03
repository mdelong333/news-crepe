var express = require("express");
// var mongoose = require("mongoose");
require("dotenv").config();
var mongojs = require("mongojs");

//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 8080;

var app = express();

var databaseUrl = "newscrepe";
var collections = ["articles"]

// //Require models
// var db = require("./models");
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error: ", error);
});

app.get("/", function(req, res) {
    res.send("Hello World!");
});

app.get("/all", function(req, res) {
    db.articles.find({}, function(error, found) {
        if (error) {
            console.log(error);
        } else {
            res.json(found);
        }
    });
});

console.log("Scraping");

app.get("/scrape", function(req, res) {

    axios.get("https://www.saveur.com/").then(function(res) {
        var $ = cheerio.load(res.data);

        var results = [];

        $("li.feed_driven_flex_feature_story").each(function(i, element) {

            var title = $(element).find("div.headline").text();
            var link = $(element).find("a").attr("href");

            if (title && link) {
                db.articles.insert({
                    title: title,
                    link: link
                },
                function(err, inserted) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(inserted);
                    }
                })
            }
            results.push({
                title: title,
                link: "https://www.saveur.com/" + link
            });
        });

        console.log(results);
    });

    res.send("Scrape Complete");

});

app.listen(8080, function() {
    console.log("App running port 8080");
});

// axios.get("https://www.saveur.com/").then(function(res) {
//     var $ = cheerio.load(res.data);

//     var results = [];

//     $("li.feed_driven_flex_feature_story").each(function(i, element) {

//         var title = $(element).find("div.headline").text();
//         var link = $(element).find("a").attr("href");

//         results.push({
//             title: title,
//             link: "https://www.saveur.com/" + link
//         });
//     });

//     console.log(results);
// })