var express = require("express");
var router = express.Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

router.get("/", function(req, res) {
    db.Article.find({}).then(function(articles) {
        res.render("index", { articles })
    })
})

//scrape articles
router.get("/scrape", function(req, res) {

    axios.get("https://www.saveur.com/classic-french-recipes/").then(function(res) {
        var $ = cheerio.load(res.data);

        $("div.embed").each(function(i, element) {

            var result = {};

            result.title = $(element).find("h3").text();
            result.link = $(element).find("a").attr("href");
            result.summary = $(element).find("span").text();
            result.image = $(element).find("img.image").attr("src");
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
router.get("/articles", function(req, res) {
    db.Article.find({}).then(function(articles) {
        res.json(articles);
    }).catch(function(err) {
        res.json(err);
    });
});

//get article by id for save
router.put("/articles/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id}, {$set: {saved: true}})
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

//get article by id to unsave
router.put("/articles/remove/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id}, {$set: {saved: false}})
    .then(function(article) {
        res.json(article);
    }).catch(function(err) {
        res.json(err);
    });
});

//get saved articles
router.get("/saved", function(req, res) {
    db.Article.find({saved: true}).then(function(articles) {
        res.render("saved", { articles });
    }).catch(function(err) {
        res.json(err);
    });
});

router.get("/clear", function(req, res) {
    db.Article.deleteMany({})
    .catch(function(err) {
        console.log(err);
    });
    res.send("Articles deleted")
});

module.exports = router;