// const createError = require('http-errors');
const logger = require('morgan');
const debug = require('debug')('server');
debug("TEST");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
// Init sockets server
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 80;
const io = require('./Server/sockets')(server);

const corsOptions = {
  'credentials': true,
  'origin': true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override, Content-Type, Cache-Control, Accept',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/', routes);

server.listen(port, (err) => {
  if (err) {
    console.log("Error was occured at server start");
    throw err;
  }
  else {
    console.log(`Server is listen at port ${port}`);
  }
});

module.exports = server;
