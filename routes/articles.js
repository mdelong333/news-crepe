var express = require("express");
var router = express.Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");


router.get("/save/:id", function(req, res) {
    db.Article.update({_id: req.params.id}, {saved: true}).then(function() {
        res.redirect("/")
    }).catch
})

module.exports = router;