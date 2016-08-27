var mongoose = require('mongoose');
var Schema = mongoose.Schema;

FeedbackSchema = Schema({
  feedbackId: String,
  userId: String,
  userName: String,
  contactCenterId: String,
  contactCenterName: String,
  timestamp: String,
  topic: String,
  text: String,
  nodePath: String,
  application: String,
  version: String,
  date: String,
  time: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
