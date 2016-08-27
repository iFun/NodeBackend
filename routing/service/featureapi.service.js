var feature = require('../../database/services/feature.service');
var FeatureService = function() {};


FeatureService.prototype.list = function(req, res) {
  feature.getById(req.params.id, res, featureResponse, errorResponse);
};

function featureResponse(res, features) {
  if (features && features.data) {
    var response = {
      status: '0',
      features: features.data
    };
    res.json(response);
  } else {
    var response = {
      status: '1',
      message: 'feautre data is not exist in the database'
    };
    res.json(response);
  }
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
module.exports = new FeatureService();
