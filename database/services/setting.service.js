var Setting = require('../models/setting.model');
var _ = require('lodash');

var SettingService = function() {}

SettingService.prototype.store = function(setting, feedbackId) {
  if (!feedbackId) return;
  _.forEach(setting, function(value, key) {
    getlevels(setting, setting[key], key, feedbackId);
  });
};

function getlevels(setting, levelobj, level, feedbackId) {
  _.forEach(levelobj, function(value, key) {
    getgroups(setting, levelobj, levelobj[key], level, key, feedbackId);
  });
}

function getgroups(setting, levelobj, groupobj, level, group, feedbackId) {
  //handle Dashboard No group situation
  if(group === 'DashBoard'){
    group = '';
  }
  _.forEach(groupobj, function(value, key) {
    var data = new Setting({
      level: level,
      group: group,
      name: key,
      value: value,
      feedbackId: feedbackId
    });
    data.save(function(err, data) {
      if (err) return console.error(err);
      if (data) return console.log(feedbackId + ' setting is saved');
    });
  });
}

SettingService.prototype.deleteAll = function() {
  Setting.remove().exec(function(err) {
    if (err) return console.error(err + 'during delete all Settings');
    console.log('All settings are deleted');
  });
};

SettingService.prototype.deleteById = function(feedbackId) {
  if (!feedbackId) return;
  Setting.find({
      feedbackId: feedbackId
    })
    .remove()
    .exec(function(err, doc) {
      if (err) return console.error(err);
      if (doc) return console.log(feedbackId + ' setting has been removed');
    });
};

SettingService.prototype.getById = function(feedbackId, res, success, error) {
  if (!feedbackId) return;
  Setting.find({
    feedbackId: feedbackId
  }, function(err, doc) {
    if (err || _.isEmpty(doc)) {
      typeof error === 'function' && error(res, err);
    } else {
      typeof success === 'function' && success(res, doc);
    }
  });
};

SettingService.prototype.search = function(req, res, success, error) {
  Setting.find({
    name: new RegExp(req.query.name, "i"),
    group: new RegExp(req.query.group, "i"),
    level: new RegExp(req.query.level, "i"),
    value: new RegExp(req.query.value, "i"),
    feedbackId: req.params.id
  }, function(err, doc) {
    if (err || _.isEmpty(doc)) {
      typeof error === 'function' && error(res, err);
    } else {
      typeof success === 'function' && success(res, doc);
    }
  });
};

module.exports = new SettingService();
