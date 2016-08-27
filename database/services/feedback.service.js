var Feedback = require('../models/feedback.model');
var _ = require('lodash');

var FeedbackService = function() {}
const defaultSort = -1;

FeedbackService.prototype.store = function(feedback, callback) {
  if (!feedback) return;
  var data = new Feedback({
    feedbackId: feedback.id,
    userId: feedback.userId,
    userName: feedback.userName,
    contactCenterId: feedback.contactCenterId,
    timestamp: feedback.timestamp,
    topic: feedback.topic,
    text: feedback.text,
    nodePath: feedback.nodePath,
    application: feedback.application,
    version: feedback.version,
    date: feedback.date,
    time: feedback.time
  });
  data.save(function(err, data) {
    if (err) return console.error(err);
    if (data) {
      console.log(feedback.id + 'stored successfully');
      typeof callback === 'function' && callback(feedback, feedback.id);
    }
  });
};

FeedbackService.prototype.deleteById = function(feedbackId, callback) {
  if (!feedbackId) return;

  Feedback.findOne({
    feedbackId: feedbackId
  }).exec(function(err, doc) {
    if (doc) {
      Feedback.findOneAndRemove(doc._id, function(err) {
        if (err) {
          console.log(err + 'when removing Feedback Feedback Id: ' + feedbackId);
        } else {
          console.log('Feedback ' + feedbackId + 'removed');
          typeof callback === 'function' && callback(feedbackId);
        }
      });
    } else {
      console.log('cannot find the feedback' + err);
    }
  });
};

FeedbackService.prototype.deleteAll = function() {
  Feedback.remove().exec(function(err) {
    if (err) return console.error(err + 'during delete all Feedbacks');
    console.log('All feedbacks are deleted');
  });
};

FeedbackService.prototype.getAll = function(req, res, isId, success, error) {
  var limit = (req && req.query && req.query.limit && !isNaN(req.query.limit)) ? parseInt(req.query.limit) : 50;
  var offset = (req && req.query && req.query.offset && !isNaN(req.query.offset)) ? parseInt(req.query.offset) : 1;


  Feedback.find()
    .limit(limit)
    .skip(limit * (offset - 1))
    .sort({
      timestamp: defaultSort
    })
    .exec(function(err, doc) {
      if (err || _.isEmpty(doc)) {
        typeof error === 'function' && error(res, err);
      } else {
        var result;
        for (var i = doc.length - 1; i >= 0; i--) {
          //return list of feedback id
          if (isId) {
            if (!result) {
              result = [];
            }
            result[i] = doc[i].feedbackId;
          } else {
            if (!result) {
              result = {};
            }
            doc[i]['__v'] = undefined;
            doc[i]['_id'] = undefined;
            result[doc[i]['feedbackId']] = doc[i];
          }
        }
        console.log('Successfully get all feedbacks' + doc);
        typeof success === 'function' && success(res, result, req.query.fields);
      }

    });
}


FeedbackService.prototype.getById = function(req, res, success, error) {
  if (!req.params.id) return;

  Feedback.findOne({
    feedbackId: req.params.id
  }, function(err, doc) {
    if (err || _.isEmpty(doc)) {
      typeof error === 'function' && error(res, err);
    } else {
      doc['__v'] = undefined;
      doc['_id'] = undefined;
      typeof success === 'function' && success(res, doc, req.query.fields);
    }
  });

}

FeedbackService.prototype.search = function(req, res, isId, success, error) {
  var limit = (req && req.query && req.query.limit && !isNaN(req.query.limit)) ? parseInt(req.query.limit) : 50;
  var offset = (req && req.query && req.query.offset && !isNaN(req.query.offset)) ? parseInt(req.query.offset) : 1;

  Feedback.find({
      userId: new RegExp(req.query.userId, "i"),
      userName: new RegExp(req.query.userName, "i"),
      contactCenterId: new RegExp(req.query.contactCenterId, "i"),
      timestamp: new RegExp(req.query.timestamp, "i"),
      topic: new RegExp(req.query.topic, "i"),
      application: new RegExp(req.query.application, "i"),
      version: new RegExp(req.query.version, "i"),
      date: new RegExp(req.query.date, "i"),
      time: new RegExp(req.query.time, "i")
    })
    .limit(limit)
    .skip(limit * (offset - 1))
    .sort({
      timestamp: defaultSort
    })
    .exec(function(err, doc) {
      if (err || _.isEmpty(doc)) {
        console.log('error');
        typeof error === 'function' && error(res, err);
      } else {
        var result;
        for (var i = doc.length - 1; i >= 0; i--) {
          //return list of feedback id
          if (isId) {
            if (!result) {
              result = [];
            }
            result[i] = doc[i].feedbackId;
          } else {
            if (!result) {
              result = {};
            }
            doc[i]['__v'] = undefined;
            doc[i]['_id'] = undefined;
            result[doc[i]['feedbackId']] = doc[i];
          }
        }
        console.log('Successfully get all feedbacks' + doc);
        typeof success === 'function' && success(res, result, req.query.fields);
      }
    });
};

module.exports = new FeedbackService();
