var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
    db.Article.find({}).then(function(articles) {
        res.render("index", { articles })
    })
})

// module.exports = function(app) {
//     app.get("/saved", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/saved.html"));
//     });

//     app.get("/", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/home.html"));
//     });

//     app.get("/home", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/home.html"));
//     });
// };

module.exports = router;