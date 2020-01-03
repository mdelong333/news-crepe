// var express = require("express");
// var mongoose = require("mongoose");
// require("dotenv").config();

//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// //Require models
// var db = require("./models");

// var PORT = process.env.PORT || 8080;

// var app = express();

console.log("Scraping");

// axios.get("https://www.fangoria.com/").then(function(response) {
//     var $ = cheerio.load(response.data);

//     var results = [];

//     $("div.link-headline").each(function(i, element) {

//         var link = $(element).parent().attr("href");

//         var title = $(element).text();

//         results.push({
//             title: title,
//             link: link
//         });
//     });

//     console.log(results);
// });

axios.get("https://www.saveur.com/").then(function(res) {
    var $ = cheerio.load(res.data);

    var results = [];

    $("li.feed_driven_flex_feature_story").each(function(i, element) {

        var title = $(element).find("div.headline").text();
        var link = $(element).find("a").attr("href");

        results.push({
            title: title,
            link: "https://www.saveur.com/" + link
        });
    });

    console.log(results);
})