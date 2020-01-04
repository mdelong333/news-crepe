var express = require("express");
var mongoose = require("mongoose");
// var mongojs = require("mongojs");

//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newscrepe", {useNewUrlParser: true});

// var databaseUrl = "newscrepe";
// var collections = ["articles"]

// //Require models
var db = require("./models");

// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//     console.log("Database Error: ", error);
// });

// app.get("/", function(req, res) {
//     res.send("Hello World!");
// });

// app.get("/all", function(req, res) {
//     db.articles.find({}, function(error, found) {
//         if (error) {
//             console.log(error);
//         } else {
//             res.json(found);
//         }
//     });
// });

// console.log("Scraping");

//scrape articles
app.get("/scrape", function(req, res) {

    axios.get("https://www.saveur.com/").then(function(res) {
        var $ = cheerio.load(res.data);

        $("li.feed_driven_flex_feature_story").each(function(i, element) {

            var result = {};

            result.title = $(element).find("div.headline").text();

            result.link = $(element).find("a").attr("href");

            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) {
                console.log(err);
            })
        });

    });

    res.send("Scrape Complete");

});

//display all articles
app.get("/articles", function(req, res) {

    db.Article.find({}).then(function(dbArticle) {

        res.json(dbArticle);

    }).catch(function(err) {

        res.json(err);

    });
});

//get article by id
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id})

    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.listen(PORT, function() {
    console.log("App running port " + PORT);
});