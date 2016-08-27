var mongoose = require('mongoose');
var Schema = mongoose.Schema;

TraceSchema = Schema({
  timestamp: String,
  level: String,
  content: String,
  feedbackId: String
});

module.exports = mongoose.model('Trace', TraceSchema);
