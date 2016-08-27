var _ = require('lodash');
var trace = require('../../database/services/trace.service');
var TraceService = function() {};


TraceService.prototype.list = function(req, res) {

  if (_.isEmpty(req.query)) {
    trace.getById(req.params.id, res,traceResponse, errorResponse);
  } else {
    trace.search(req, res,traceResponse, errorResponse);
  }

};

function traceResponse(res, traces) {
  for (var i = traces.length - 1; i >= 0; i--) {
    traces[i]._id = undefined;
    traces[i].__v = undefined;
    traces[i].feedbackId = undefined;
  }

  var response = {
    status: '0',
    traces: traces
  };
  res.json(response);
}


function errorResponse(res, error) {
  if (!error) {
    error = 'no data return from the database';
  }
  var response = {
    status: '1',
    message: error
  };
  res.json(response);
}
module.exports = new TraceService();
