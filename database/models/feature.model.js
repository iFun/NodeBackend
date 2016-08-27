var mongoose = require('mongoose');
var Schema = mongoose.Schema;

FeatureSchema = Schema({
  data: Array,
  feedbackId: String
});

module.exports = mongoose.model('Feature', FeatureSchema);
