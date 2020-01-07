var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
    db.Article.find({}).then(function(articles) {
        res.render("index", { articles })
    })
})

module.exports = router;