var express = require("express");
var mongoose = require("mongoose");
var hbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

//Require models
var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

//Handlebars setup
app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

var routes = require("./routes/htmlRoutes");
app.use(routes);

mongoose.connect("mongodb://localhost/newscrepe", {useUnifiedTopology: true});

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

app.get("/clear", function(req, res) {
    db.Article.deleteMany({})
    .catch(function(err) {
        console.log(err);
    });
    res.send("Articles deleted")
});

app.listen(PORT, function() {
    console.log("App running port " + PORT);
});