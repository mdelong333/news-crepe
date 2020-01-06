var express = require("express");
var mongoose = require("mongoose");
var hbs = require("express-handlebars");
var router = express.Router();

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

//Routes
var scrapeR = require("./routes/scrape");
app.use(scrapeR);
var articlesR = require("./routes/articles");
app.use(articlesR);

mongoose.connect("mongodb://localhost/newscrepe", {useUnifiedTopology: true});

//articles api
// app.get("/articles", function(req, res) {

//     db.Article.find({}).then(function(dbArticle) {
//         res.json(dbArticle);
//     }).catch(function(err) {
//         res.json(err);
//     });
// });



//get article by id
// app.get("/articles/:id", function(req, res) {
//     db.Article.findOne({ _id: req.params.id})
//     .then(function(dbArticle) {
//         res.json(dbArticle);
//     }).catch(function(err) {
//         res.json(err);
//     });
// });

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