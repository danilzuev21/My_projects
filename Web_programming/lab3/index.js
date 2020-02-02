const express = require('express');
const app = express();
const path = require('path');
const booksRouter = require('./routes/booksRouters');
const fs = require("fs");
const https = require("https");
var logger = require('morgan');

const port = 3000;
var bodyParser = require('body-parser');

var keys = {
    key: fs.readFileSync('./ssl/ex.key'),
    cert: fs.readFileSync('./ssl/ex.crt'),
};

app.set('views', path.join(__dirname, 'pug_files'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', booksRouter);

let server = https.createServer(keys, app).listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});