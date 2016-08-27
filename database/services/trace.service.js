var Trace = require('../models/Trace.model');
var _ = require('lodash');

var TraceService = function() {}


TraceService.prototype.store = function(trace, feedbackId) {
  var array;
  for (var i = trace.length - 1; i >= 0; i--) {
    var data = new Trace({
      timestamp: trace[i].substring(0, trace[i].indexOf('[') - 1),
      level: trace[i].substring(trace[i].indexOf('[') + 1, trace[i].indexOf(']')),
      content: trace[i].substring(trace[i].indexOf(']') + 2, trace[i].length),
      feedbackId: feedbackId
    });
    data.save(function(err, data) {
      if (err) return console.error(err);
      if (data) return console.log(feedbackId + 'traces are saved');
    });
  }
};

TraceService.prototype.deleteAll = function() {
  Trace.remove().exec(function(err) {
    if (err) return console.error(err + 'during delete all Traces');
    console.log('All Traces are deleted');
  });
};

TraceService.prototype.deleteById = function(feedbackId) {
  if (!feedbackId) return;
  Trace.find({
      feedbackId: feedbackId
    })
    .remove()
    .exec(function(err, doc) {
      if (err) return console.error(err);
      if (doc) return console.log(feedbackId + ' trace has been removed');
    });
};

TraceService.prototype.getById = function(feedbackId, res, success, error) {
  if (!feedbackId) return;
  Trace.find({
    feedbackId: feedbackId
  }, function(err, doc) {
    if (err || _.isEmpty(doc)) {
      typeof error === 'function' && error(res, err);
    } else {
      console.log(doc);
      typeof success === 'function' && success(res, doc);
    }
  });
};

TraceService.prototype.search = function(req, res, success, error) {
  Trace.find({
    timestamp: new RegExp(req.query.time, "i"),
    content: new RegExp(req.query.content, "i"),
    level: new RegExp(req.query.level, "i"),
    feedbackId: req.params.id
  }, function(err, doc) {
    if (err || _.isEmpty(doc)) {
      typeof error === 'function' && error(res, err);
    } else {
      typeof success === 'function' && success(res, doc);
    }
  });
};

module.exports = new TraceService();
