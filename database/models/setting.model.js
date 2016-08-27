var mongoose = require('mongoose');
var Schema = mongoose.Schema;

SettingSchema = Schema({
  level: String,
  group: String,
  name: String,
  value: String,
  feedbackId: String
});


module.exports = mongoose.model('Setting', SettingSchema);
