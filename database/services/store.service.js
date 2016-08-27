var feedback = require('./feedback.service');
var feature = require('./feature.service');
var trace = require('./trace.service');
var setting = require('./setting.service');

var app = module.exports = {};



app.init = function(file) {
  for (var i = file.length - 1; i >= 0; i--) {
      storeFeedback(file[i]);
  }
}
app.removeAll = function() {
  feedback.deleteAll();
  setting.deleteAll();
  trace.deleteAll();
  feature.deleteAll();
}

app.removeById = function(feedbackId) {
  feedback.deleteById(feedbackId,removeAttribute);
}

function removeAttribute(feedbackId) {
  setting.deleteById(feedbackId);
  trace.deleteById(feedbackId);
  feature.deleteById(feedbackId);
}


function storeFeedback(file) {
  console.log('saving feedback' + file.id);
  feedback.store(file, storeAttribute);
}

function storeAttribute(file, feedbackId) {
  feature.store(file.features, feedbackId);
  trace.store(file.traces, feedbackId);
  setting.store(file.settings, feedbackId);
}
