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

var routes = require("./controller/routes");
app.use(routes);

mongoose.connect("mongodb://localhost/newscrepe", {useUnifiedTopology: true});

app.get("/", function(req, res) {
    db.Article.find({}).then(function(articles) {
        res.render("index", articles);
    }).catch(function(err) {
        res.json(err);
    });
});

//scrape articles
app.get("/scrape", function(req, res) {

    axios.get("https://www.saveur.com/").then(function(res) {
        var $ = cheerio.load(res.data);

        $("li.feed_driven_flex_feature_story").each(function(i, element) {

            var result = {};

            result.title = $(element).find("div.headline").text();

            result.link = $(element).find("a").attr("href");

            result.summary = $(element).find("div.subtitle").text();

            result.image = $(element).find("img.responsive_image").attr("src");

            db.Article.create(result).then(function(articles) {
                console.log(articles);
            }).catch(function(err) {
                console.log(err);
            })
        });

    });

    res.send("Scrape Complete");

});

//display all articles
app.get("/articles", function(req, res) {
    db.Article.find({}).then(function(articles) {
        res.json(articles);
    }).catch(function(err) {
        res.json(err);
    });
});

//get article by id for save
app.put("/articles/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id}, {$set: {saved: true}})
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

//get article by id to unsave
app.put("/articles/remove/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id}, {$set: {saved: false}})
    .then(function(article) {
        res.json(article);
    }).catch(function(err) {
        res.json(err);
    });
});

//get saved articles
app.get("/saved", function(req, res) {
    db.Article.find({saved: true}).then(function(articles) {
        res.render("saved", { articles });
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