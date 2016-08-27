var _ = require('lodash');
var feedback = require('../../database/services/feedback.service');
var FeedbackService = function() {};

FeedbackService.prototype.getById = function(req, res) {
  feedback.getById(req, res, feedbackResponse, errorResponse);
};

FeedbackService.prototype.list = function(req, res) {
  var flag = false;
  _.forEach(req.query, function(value, key) {
    if (key != 'limit' && key != 'offset' && key != 'fields' && value != undefined) {
      flag = true;
    }
  });
  const response;

  //only requesting feedback id
  if (!flag && !req.query.fields) {
    feedback.getAll(req, res, true, feedbackIdResponse, errorResponse);
  } else if (!flag && req.query.fields) {
    feedback.getAll(req, res, false, feedbackResponse, errorResponse);
  } else if (flag && !req.query.fields) {
    feedback.search(req, res, true, feedbackIdResponse, errorResponse);
  } else {
    feedback.search(req, res, false, feedbackResponse, errorResponse);
  }
};

function feedbackResponse(res, feedbacks, fields) {
  var response = {
    status: '0',
    feedbacks: {}
  };

  if (fields === '*' || fields === undefined) {
    response.feedbacks = feedbacks;
    res.json(response);
    return;
  }

  const array = fields.split(",");

  _.forEach(feedbacks, function(value, key) {
    response['feedbacks'][key] = _.pick(feedbacks[key], array);
  });

  res.json(response);
}


function feedbackIdResponse(res, feedbackId) {
  var response = {
    status: '0',
    feedbacks: feedbackId
  };
  console.log(feedbackId);
  res.json(response);
}

function errorResponse(res, error) {
  if (!error) error = 'no data returned from database';
  var response = {
    status: '1',
    message: error
  };
  res.json(response);
}

module.exports = new FeedbackService();
