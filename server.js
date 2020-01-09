var express = require("express");
var mongoose = require("mongoose");
var hbs = require("express-handlebars");

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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newscrepe"
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true});

app.listen(PORT, function() {
    console.log("App running port " + PORT);
});