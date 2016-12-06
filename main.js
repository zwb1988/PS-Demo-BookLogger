var express = require("express");
var path = require("path");
var app = express();
var rootPath = path.normalize(__dirname + "/public");
var bodyParser = require("body-parser");

var api = require('./apiMethods');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath));

app.get('/api/books', api.getAllBooks);
app.get('/api/books/:id', api.getBook);
app.get('/api/readers', api.getAllReaders);
app.put('/api/books/:id', api.updateBook);
app.post('/api/books', api.addBook);
app.delete('/api/books/:id', api.deleteBook)

var portNumber = 8000;
app.listen(portNumber);
console.log("Listening on port " + portNumber + "...");
