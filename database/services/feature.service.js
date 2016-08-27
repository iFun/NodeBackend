var Feature = require('../models/feature.model');



var FeatureService = function() {}


FeatureService.prototype.store = function(feature, feedbackId) {
  if (!feedbackId) return;

  var data = new Feature({
    data: feature,
    feedbackId: feedbackId
  });

  data.save(function(err, data) {
    if (err) return console.error(err);
    if (data) return console.log('features stored successfully');
  });
};

FeatureService.prototype.deleteById = function(feedbackId) {
  if (!feedbackId) return;

  Feature.findOne({
    feedbackId: feedbackId
  }).exec(function(err, doc) {
    if (doc) {
      Feature.findOneAndRemove(doc._id, function(err) {
        if (err) {
          console.log(err + 'when removing Feature Feature Id: ' + feedbackId);
        } else {
          console.log(feedbackId + ' feature has been removed');
        }
      });
    } else {
      console.log('cannot find the feature' + err);
    }
  });
};

FeatureService.prototype.getById = function(feedbackId, res, success, error) {
  if (!feedbackId) return;

  Feature.findOne({
    feedbackId: feedbackId
  }, function(err, doc) {
    if (err) {
      typeof error === 'function' && error(res, err);
    } else {
      typeof success === 'function' && success(res, doc);
    }
  });

};

FeatureService.prototype.deleteAll = function() {
  Feature.remove().exec(function(err) {
    if (err) return console.error(err + 'during delete all features');
    console.log('All features are deleted');
  });
};

module.exports = new FeatureService();
