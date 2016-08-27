var mongoose = require('mongoose');
var db = mongoose.connection;
var feedback = require('./services/feedback.service');
var store = require('./services/store.service')
var watch = require('watch')
var output = require('../parser');
var database = module.exports = {};


database.init = function() {

  //your own database ip
  mongoose.connect('ip address');

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connected to mongo');
    autoStore();
  });
};

function autoStore() {
  watch.createMonitor('../feedback/', function(monitor) {
    monitor.on("created", function(path) {
      if (checkExtension(path)) {
        var file = output.init(path);
        store.init(file);
      }
    })
    monitor.on("changed", function(path) {
      if (checkExtension(path)) {
        var file = output.init(path);
        store.init(file);
      }
    })
  })
}

function checkExtension(filename) {
  var arr = filename.split('.');
  var extension = arr[arr.length - 1];
  if (extension != 'log') {
    console.log('The input file is not a log file');
    return false;
  }
  return true;
}
