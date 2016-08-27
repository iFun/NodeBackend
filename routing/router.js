var database = require('../database/mongodb');
var express = require('express');
var morgan = require('morgan');
var app = module.exports = express();

database.init();

app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  next();
})

var server = app.listen(8081, function(response) {
  const host = server.address().address;
  const port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});

require('./unsecured/feedback')(app);
