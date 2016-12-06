var express = require("express");
var path = require("path");
var app = express();
var rootPath = path.normalize(__dirname + "/public");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath));

var portNumber = 8000;
app.listen(portNumber);
console.log("Listening on port " + portNumber + "...");
